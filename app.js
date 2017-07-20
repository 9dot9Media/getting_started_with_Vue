const app = new Vue({
    el: '#app',
    template: `<div>
                <input v-model="query" @keyup.enter="search" />
                <button @click="search">Search</button>
                <ul>
                <li v-for="user in users" :key="user.id">
                    <img :src="user.avatar_url" height="128"/>
                    <a :href="user.html_url">{{ user.login }}</a>
                    <span v-if="user.type == 'User'">(U)</span>
                    <span v-else>(O)</span>
                </li>
                </ul>
            </div>`,
    data: {
        users: [],
        query: ''
    },
    methods: {
        search: function() {
            fetch('https://api.github.com/search/users\?q\=' + this.query)
                .then((response) => response.json())
                .then((json) => { this.users = json.items });
        }
    }
});