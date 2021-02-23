<script>
import axios from 'axios';
import url from 'url';
import queryString from 'querystring';
export default {
    async created() {
        // let query = url.parse(window.location.href).query;
        let query = this.$route.query
        if (query.SAMLResponse) {
            let params = {
                responseMsg: query.SAMLResponse
            }
             let res = await axios.get('/itgp-core/KernelCoreService/samlRequest/responseParsing', {params});
             if (res && res.data) {
                let ssoid = res.data.ssoId;
                let sessionIndex = res.data.sessionIndex;
                let paramsSession = {
                    sessionIndex
                }
                let result = await axios.get('/itgp-core/UserDataService/userInfo/identityService/sessionIndexChecking', {params: paramsSession});
                if (result && result.data && result.data.data && result.data.data.response) {
                    window.location.href = `http://3.20.23.1:10000/dgms-manager-web/#/first?suzhouSsoId=${ssoid}`;
                } else {
                    this.$Messsage.error("单点登录失败,将跳转的登录页面！")
                    window.location.href = `http://3.20.23.1:10000/dgms-manager-web/#/login`;
                }
             }
        }
    }
};
</script>