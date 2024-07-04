import service from "../http";
const url = {

}
/**
 * 
 * GET  /accounts/active/ 点击激活链接   
DELETE /accounts/cancel/
POST /accounts/login/
GET /accounts/logout/
PATCH /accounts/password change/
PATCH /accounts/password reset/
POST /accounts/register/
POST /accounts/send password reset email/ 发送密码重置邮件

accounts active
accounts cancel
accounts login
accounts logout
accounts password change
accounts password reset
accounts register
send password reset email
 */
export class Account{
    static async account_active(data){
        return service("/accounts/active/", {
            method: "get",
            data
        })
    }
    static async accountsCancel(){
        return service("/accounts/cancel/", {
            method: "delete",
        })
    }
    static async accounts_login(data){
        return service("/accounts/login/", {
            method: "post",
            data
        })
    }
    static async accounts_logout(data){
        return service("/accounts/logout/", {
            method: "get",
            data
        })
    }
    static async accounts_password_change(data){
        return service("/accounts/password_change/", {
            method: "patch",
            data
        })
    }
    static async accounts_password_reset(data){
        return service("/accounts/password_reset/", {
            method: "patch",
            data
        })
    }
    static async accounts_register(data){
        return service("/accounts/register/", {
            method: "post",
            data
        })
    }
    static async send_password_reset_email(data){
        return service("/accounts/send_password_reset_email/", {
            method: "post",
            data
        })
    }


}