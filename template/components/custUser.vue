<template>
    <span>{{userName}}</span>
</template>
<script>

import {findUserName} from '@/api/system/user'

const token = sessionStorage.getItem('token')
export default {
    props: {
        userId: {
            type: String
        }
    },
    data() {
        return {
            userName: ''
        }
    },
    mounted() {
        this.getUserName()
    },
    methods: {
        async getUserName() {
            const {data} = await findUserName({token: token, userId: this.userId})
            this.userName = data.userName || ''
        }
    }
}
</script>