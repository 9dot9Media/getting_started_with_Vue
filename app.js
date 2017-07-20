Vue.component('github-user', {
    props: ['user'],
    template: `<li>
                 <img :src="user.avatar_url" height="128" />
                 <a :href="user.html_url">{{ user.login }}</a>
                 <span v-if="user.type == 'User'">(U)</span>
                 <span v-else>(O)</span>
               </li>`
});

Vue.component('search-bar', {
    template: `<div>
                 <input v-model="query" @keyup.enter="search" />
                 <button @click="search">Search</button>
               </div>`,
    data: function() {
        return { query: '' };
    },
    methods: {
        search: function() {
            this.$emit('search', this.query);
        }
    }
});

const app = new Vue({
    el: '#app',
    template: `<div>
                 <search-bar @search="search" />
                 <ul>
                   <github-user v-for="user in users"
                                :user="user"
                                :key="user.id"/>
                 </ul>
               </div>`,
    data: {
        users: []
    },
    methods: {
        search: function(query) {
            fetch('https://api.github.com/search/users\?q\=' + query)
                .then((response) => response.json())
                .then((json) => { this.users = json.items });
        }
    }
});