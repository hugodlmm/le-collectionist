<template>
    <section class="footer">
        <div class="left">
            <p>
                Site web réalisé et designé par
                <a href="https://hugo-web.fr">
                    Hugo-web.fr
                </a>
            </p>
        </div>
        <div class="right">
            <p>
                Tout droits réservés ©HugoWeb {{ currentYear.value }}
            </p>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'FooterMain',
    data() {
        return {
            currentYear: {
                type: Number,
                value: 2022
            },
        }
    },
    mounted() {
        this.currentYear.value = new Date().getFullYear();
    },
})
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.footer {
    background-color: #282828;
    height: 90px;
    line-height: 90px;
    padding: 0 var(--base-padding);
    color: #fff;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;


    a {
        font-weight: 900;
        text-decoration: none;
        font-size: 1.125rem;

        &:visited {
            color: #fff;
        }
    }
}
</style>