import { toast } from 'react-toastify'; 
import errorCode from '../utils/ErrorCode'; 

function handleError(error) {
    const errorHeaders = error.response?.headers;
    if (errorHeaders?.code) {
        const errorName = Object.values(errorCode).find(
            (obj) => obj.code === errorHeaders.code
        );
        const userNotice = errorName.notice;

        console.log(`에러 내용: ${errorName}`); // 백엔드 확인용
        toast.error(`${userNotice}`); // 유저 팝업용
    } else {
        console.log(`확인되지 않은 에러, ${error}`); // 에러 예외
    }
    
}

export default handleError;
