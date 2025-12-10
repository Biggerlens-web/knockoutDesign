<template>
    <div class="phonenumberbox" v-if="isPhoneNumberVisible">
        <div class="close" @click="togglePhoneNumberVisibility">
            <img :src="`${getCdnBaseUrl()}/close.png`" alt="close" loading="lazy" />
        </div>
        <div class="title">{{ $t(`area_title`) }}</div>
        <div class="contonet">
            <ul class="leftpanel" ref="scrollView" @scroll="scrollmove">
                <li v-for="(contacts, letter) in sortedGroupedContacts" :key="letter" :id="letter">
                    <p class="letter_title">{{ letter }}</p>
                    <ul class="code_list" v-for="item in contacts" :key="item.id">
                        <li @click="chosedAreaCode(item.phone_code)">
                            <span>{{ locale == 'zh' ? item.translations.cn : item.translations.de }}</span>
                            <span>{{ '+' + item.phone_code }}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul class="rightpanel">
                <li v-for="letter in alphabet" :key="letter" :class="{ activeStyle: activeIndex == letter }"
                    @click="scrollTo(letter)">
                    {{ letter }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, nextTick, onBeforeUnmount, onBeforeMount } from 'vue'

    import { getCdnBaseUrl } from '~/utils/cdnBaseUrl'
    import countryCodes from '~/utils/areaCode.json'

    const areaCodeList = ref(countryCodes)


    const emit = defineEmits(['getAreaCode'])


    let pinyin = null; // Initialize pinyin to null

    const { locale } = useI18n()

    const activeIndex = ref('A')
    const scrollView = ref(null)

    const isPhoneNumberVisible = defineModel('visible', {
        type: Boolean,
        default: false
    })
    const togglePhoneNumberVisibility = () => {
        isPhoneNumberVisible.value = false
    }

    // 为每一项添加拼音属性
    const addPinyinToArray = array => {
        if (!pinyin) return array; // If pinyin is not loaded, return original array
        return array.map(item => {
            // 获取拼音缩写
            const pinyinAbbreviation = pinyin(item.translations.cn, {
                style: pinyin.STYLE_FIRST_LETTER,
                heteronym: false
            })
                .map(pinyinItem => pinyinItem[0])
                .join('')

            // 添加拼音属性
            return {
                ...item,
                pinyin: pinyinAbbreviation
            }
        })
    }
    const resultList = addPinyinToArray(areaCodeList.value)
    // console.log('拼音数组',resultList);

    // 定义字母表
    const alphabet = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))

    const chosedAreaCode = code => {
        if (code.includes('and')) {
            console.log(code)
            const newCode = code.split('and')[0].trim()
            code = newCode
            // stores.commit('setAreaCode', code)

            emit('getAreaCode', code)
        } else {
            // stores.commit('setAreaCode', code)
            emit('getAreaCode', code)
        }

        // stores.commit('setPhoneNum', false)
        togglePhoneNumberVisibility()

    }

    // 滚动到指定字母
    let isManualScroll = false
    const scrollTo = letter => {
        const element = document.getElementById(letter)
        if (element) {
            isManualScroll = true
            element.scrollIntoView({ behavior: 'smooth' })
            activeIndex.value = letter
            setTimeout(() => {
                isManualScroll = false
            }, 1000)
        }
    }
    let isScrolling
    const scrollmove = () => {
        if (isManualScroll) return
        clearTimeout(isScrolling)
        isScrolling = setTimeout(() => {
            const parentEl = scrollView.value
            const scrollTop = parentEl.scrollTop
            const parentHeight = parentEl.clientHeight
            alphabet.value.forEach(item => {
                let groupEl = document.querySelector('#' + item)
                if (groupEl) {
                    const groupTop = groupEl.offsetTop
                    const groupBottom = groupTop + groupEl.offsetHeight
                    if (groupTop <= scrollTop + parentHeight && groupBottom >= scrollTop) {
                        if (activeIndex.value !== item) {
                            activeIndex.value = item
                        }
                    }
                }
            })
        }, 200)
    }

    // 按首字母分组数据
    const groupedContacts = ref(
        resultList.reduce((result, contact) => {
            const firstLetter = contact.pinyin && contact.pinyin.length > 0 ? contact.pinyin[0].toUpperCase() : (contact.name && contact.name.length > 0 ? contact.name[0].toUpperCase() : '#');
            if (!result[firstLetter]) {
                result[firstLetter] = []
            }
            result[firstLetter].push(contact)
            return result
        }, {})
    )

    // 计算排序后的分组
    const sortedGroupedContacts = computed(() => {
        // 获取所有的首字母并排序
        const sortedKeys = Object.keys(groupedContacts.value).sort()

        // 根据排序后的首字母重新组织数据
        const sortedContacts = sortedKeys.reduce((result, key) => {
            result[key] = groupedContacts.value[key]
            return result
        }, {})

        return sortedContacts
    })

    onBeforeMount(async () => {
        if (process.client) {
            const pinyinModule = await import('pinyin');
            pinyin = pinyinModule.default || pinyinModule;
            // Re-initialize or update dependent data after pinyin is loaded
            resultList.value = addPinyinToArray(countryCodes);
            // Potentially re-initialize groupedContacts and sortedGroupedContacts here if they depend on pinyin directly
            // For example, if groupedContacts's initialization relies on pinyin being available:
            groupedContacts.value = resultList.value.reduce((result, contact) => {
                const firstLetter = contact.pinyin && contact.pinyin.length > 0 ? contact.pinyin[0].toUpperCase() : (contact.name && contact.name.length > 0 ? contact.name[0].toUpperCase() : '#');
                if (!result[firstLetter]) {
                    result[firstLetter] = [];
                }
                result[firstLetter].push(contact);
                return result;
            }, {});
        }
    });

    onMounted(() => { })
</script>

<style scoped lang="scss">
    .phonenumberbox {
        position: fixed;
        width: 400px;
        height: 660px;
        background: #ffffff;
        border-radius: 20px 20px 20px 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        z-index: 1003;

        .close {
            cursor: pointer;
            position: absolute;
            width: 36px;
            height: 36px;
            top: 16px;
            right: 16px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 12px;
                height: 12px;
            }
        }

        .title {
            width: 100%;
            height: 92px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: PingFang SC, PingFang SC;
            font-weight: 600;
            font-size: 26px;
            color: #333333;
            line-height: 30px;
            text-align: left;
            font-style: normal;
            text-transform: none;
        }
    }

    .contonet {
        width: 100%;
        display: flex;
        height: 568px;
        position: relative;
        overflow: hidden;

        .leftpanel {
            width: 388px;
            overflow-y: scroll;
            height: 100%;

            &::-webkit-scrollbar {
                width: 16px;
                height: 60px;

            }

            &::-webkit-scrollbar-track {
                background: #fafafa;
            }

            &::-webkit-scrollbar-thumb {
                background: #d9d9d9;
                border-radius: 20px;
                padding: 2px;
                border: 2px solid #fafafa;
                /* 设置边框颜色与背景一致 */
            }

            li {
                .letter_title {
                    box-sizing: border-box;
                    padding: 0 20px;
                    background: #eeeeee;
                    height: 20px;
                    line-height: 20px;
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 600;
                    font-size: 16px;
                    color: #999999;
                    margin-bottom: 10px;
                }

                .code_list {
                    box-sizing: border-box;

                    li {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: 40px;
                        padding: 10px 20px;
                        box-sizing: border-box;
                        cursor: pointer;

                        span {
                            &:nth-of-type(1) {
                                font-family: PingFang SC, PingFang SC;
                                font-weight: 500;
                                font-size: 14px;
                                color: #000000;
                            }

                            &:nth-of-type(2) {
                                font-family: PingFang SC, PingFang SC;
                                font-weight: 500;
                                font-size: 14px;
                                color: #999999;
                            }
                        }
                    }
                }
            }
        }

        .rightpanel {
            width: 28px;
            height: 568px;
            display: flex;
            flex-direction: column;

            li {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 20px;
                font-family: PingFang SC, PingFang SC;
                font-weight: 600;
                font-size: 14px;
                color: #999999;
                line-height: 16px;
                text-align: center;
                font-style: normal;
                text-transform: none;
                cursor: pointer;
            }

            .activeStyle {
                background: #eeeeee;
            }
        }
    }
</style>
