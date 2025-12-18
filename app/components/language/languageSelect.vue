<template>
    <ul class="language_select">
        <li v-for="item in locales" :key="item.code" @click.stop="setLocale(item.code)">
            <span class="language_item_name">
                {{ item.name }}
            </span>
            <img v-if="item.code === locale" src="/img/selectedIcon.png" alt="">

        </li>
    </ul>
</template>

<script lang="ts" setup>
    const { locale, setLocale, locales } = useI18n()


    onMounted(() => {
        console.log('语言列表', locales.value);
    })
</script>

<style lang="scss" scoped>


    .language_select {
        width: 190px;
        background: #FFFFFF;
        box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
        border-radius: 6px 6px 6px 6px;
        box-sizing: border-box;
        padding: 6px 0px;

        li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 36px;
            box-sizing: border-box;
            padding: 0 16px;

            &:hover {
                background: #F7F6FA;
            }

            span {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #000000;
            }

            img {
                width: 24px;
                height: 24px;
            }
        }
    }
</style>