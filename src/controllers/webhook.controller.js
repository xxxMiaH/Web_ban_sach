let webhookUtil = require('../utils/webhook.util');
let getTokenUtil = require('../utils/get_token.util');
let syncUtil = require('../utils/sync.util');
let userUtil = require('../utils/get_user_info.util');
import monent from 'moment';
//DEMO Xây dựng webhook của bạn
//Router này sẽ là webhook nhận thông tin giao dịch từ casso gọi qua được bảo mật bằng secure_token trong header
// ============
//Tùy theo ứng dụng của bạn mà có thể thay đổi, ở đây mình mặc định một vài thông số
//Tiền tố giao dịch
const transaction_prefix = 'EBOOK';
// Phân biệt chữ hoa/thường trong tiền tố giao dịch
const case_insensitive = false;
//Hạn của đơn hàng là 3 ngày. Quá 3 ngày thì không xử lý
const expiration_date = 3;
// API KEY lấy từ casso
const api_key =
   'AK_CS.2383a6e0c47d11ed8f2f9f7a85b1d621.24scfeiDEZSENqIrBs2sGlmsSAl8tbLHZuZ2tnj1svxX7iSCBROeNlqCjjzNxVbLmSK4cmxg';
// secure_token đăng kí khi tạo webhook
const secure_token = 'R5G4cbnN7uSAwfTd';

class WebhookController {
   handlerBankTransfer = async (req, res) => {
      try {
         // B1: Ở đây mình sẽ thực hiện check secure-token. Bình thường phần này sẽ nằm trong middlewares
         // Mình sẽ code trực tiếp tại đây cho dễ hình dung luồng. Nếu không có secure-token hoặc sai đều trả về lỗi
         if (
            !req.header('secure-token') ||
            req.header('secure-token') != secure_token
         ) {
            return res.status(401).json({
               code: 401,
               message: 'Missing secure-token or wrong secure-token',
            });
         }
         console.log(req.body.data);
         // return res.status(200).json({
         //    code: 200,
         //    message: 'Success',
         //    data: req.body.data,
         // });
         // B2: Thực hiện lấy thông tin giao dịch
         for (let item of req.body.data) {
            // Lấy thông orderId từ nội dung giao dịch
            let orderId = webhookUtil.parseOrderId(
               case_insensitive,
               transaction_prefix,
               item.description
            );
            // Nếu không có orderId phù hợp từ nội dung ra next giao dịch tiếp theo
            if (!orderId) continue;
            // Kiểm tra giao dịch còn hạn hay không? Nếu không qua giao dịch tiếp theo
            if (
               (new Date().getTime() - new Date(item.when).getTime()) /
                  86400000 >=
               expiration_date
            )
               continue;

            // console.log(req.body.data);
         }
         return res.status(200).json({
            code: 200,
            message: 'success',
            data: null,
         });
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            message: 'Internal server error',
            data: null,
         });
      }
   };

   usersPaid = async (req, res) => {
      try {
         console.log(req.body);
         // Để thực hiện tính năng đồng bộ cần có Số tài khoản, Bạn có thể validate bằng schema ở middlewares
         // Hoặc có thể kiểm tra trong đây luôn
         if (!req.body.accountNumber) {
            return res.status(404).json({
               code: 404,
               message: 'Not found Account number',
            });
         }
         //Lấy token bằng hàm lấy token. Token có hạn 6h nên bạn có thể lưu lại khi nào hết thì gọi hàm lấy token lại
         let resToken = await getTokenUtil.getTokenByAPIKey(api_key);
         console.log(resToken);
         let accessToken = resToken.access_token;
         //Tiến hành gọi hàm đồng bộ qua casso
         await syncUtil.syncTransaction(req.body.accountNumber, accessToken);
         return res.status(200).json({
            code: 200,
            message: 'success',
            data: null,
         });
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            message: 'Internal server error',
            data: null,
         });
      }
   };

   registerWebhook = async (req, res) => {
      try {
         // Lấy token bằng hàm lấy token. Token có hạn 6h nên bạn có thể lưu lại khi nào hết thì gọi hàm lấy token lại
         // api_key có thể thay thế nhận từ nhiều user
         let resToken = await getTokenUtil.getTokenByAPIKey(api_key);
         let accessToken = resToken.access_token;
         //Delete Toàn bộ webhook đã đăng kí trước đó với https://api-ebook.cyclic.app/webhook/handler-bank-transfer
         await webhookUtil.deleteWebhookByUrl(
            'https://api-ebook.cyclic.app/api/webhook/handler-bank-transfer',
            accessToken
         );
         //Tiến hành tạo webhook
         let data = {
            webhook:
               'https://api-ebook.cyclic.app/api/webhook/handler-bank-transfer',
            secure_token: secure_token,
            income_only: true,
            money: req.body.total_price,
            captcha: req.body.captcha
         };
         let newWebhook = await webhookUtil.create(data, accessToken);
         // Lấy thông tin về userInfo
         let userInfo = await userUtil.getDetailUser(accessToken);
         return res.status(200).json({
            code: 200,
            message: 'success',
            data: {
               webhook: newWebhook.data,
               userInfo: userInfo.data,
            },
         });
      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            message: 'Internal server error',
            data: null,
         });
      }
   };
}

export default new WebhookController();
