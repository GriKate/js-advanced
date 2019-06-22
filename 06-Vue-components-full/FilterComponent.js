Vue.component('filter-comp', {
    data() {
        return {
            searchWord: '',
        }
    },
    template: `<form action="#" method="post" class="search-form" @submit.prevent="$parent.$refs.products.filter(searchWord)">
                    <input type="text" class="search-field" v-model="searchWord">
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
});
