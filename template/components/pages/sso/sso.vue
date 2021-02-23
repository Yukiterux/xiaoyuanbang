<script>
import axios from 'axios';


export default {
    async created() {
        let loignParams = {
            issuerId: 'HLWJGSJZX_1.0',
            issueIndex: '1900274139',
            callback: encodeURI("http://3.20.23.1:10000/ssoCallback/ssoOauth"),
        }
        let result = await axios.get('/itgp-core/KernelCoreService/samlRequest/login', {params: loignParams})
        if (result && result.data && result.data.code == 200) {
            let SAMLLoginResponse = result.data.response.SAMLLoginResponse; 
            window.location.href = `http://itgp-is.snd.gov:9763/samlsso?SAMLRequest=${SAMLLoginResponse}`
        }
    }
};
</script>