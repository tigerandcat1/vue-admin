<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab" :class="{'current':item.current}" :key="item.id" @click="tiggleMneu(item)" >{{item.txt}}</li>
            </ul>
            <!-- 表单 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login-form" size="medium" >
            <el-form-item prop="username" class="item-from">
                <label>邮箱：</label>
                <el-input type="email" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="item-from">
                <label>密码：</label>
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="passwords" class="item-from" v-if="model==='register'">
                <label>再次输入密码：</label>
                <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="code" class="item-from">
                <label>验证码：</label>
                <el-row :gutter="20">
                <el-col :span="14"> <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input></el-col>
                <el-col :span="10"><el-button type="success" class="block"><span>获取验证码</span></el-button></el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="submitForm('ruleForm')" class="block" >提交</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
//引用验证文件，不加后缀是因为在vue.config.js里面配置过了
import { stripscript, validatePass, validateEmail, validateVCode } from '@/utils/validate';
export default {
    name:"login",
    data(){
        // 验证码
        var checkCode = (rule, value, callback) => {
        let reg = /^[a-z0-9]{6}$/
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else if(validateVCode(value)){
          return callback(new Error('请输入正确格式验证码'));
        }else{
            callback();
        }
      };
      //验证用户名为邮箱
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if (validateEmail(value)){
          callback(new Error('格式不正确'));
        }else {
          callback();
        }
      };
      //验证用户密码
      var validatePassword = (rule, value, callback) => {
        //过滤数据
        this.ruleForm.password = stripscript(value)
        value = this.ruleForm.password
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if(validatePass(value)){
          callback(new Error('密码格式并不正确'));
        } else {
          callback();
        }
      };
      //验证用户的再次密码
      var validatePasswords = (rule, value, callback) => {
        //过滤数据
        this.ruleForm.passwords = stripscript(value)
        value = this.ruleForm.passwords
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if(value!==this.ruleForm.password){
          callback(new Error('两次密码不一致'));
        } else {
          callback();
        }
      };
        return{
            menuTab:[
                {txt:'登录',currrent:false,type:'login'},
                {txt:'注册',current:false,type:'register'}
                ],
            //
            model:'login',
            ruleForm: {
                username: '',
                password: '',
                code: '',
                passwords:''
                },
            rules: {
            username: [
                { validator: validateUsername, trigger: 'blur' }
            ],
            password: [
                { validator: validatePassword, trigger: 'blur' }
            ],
            passwords:[
                { validator: validatePasswords, trigger: 'blur' }
            ],
            code: [
                { validator: checkCode, trigger: 'blur' }
            ]
            }
            }
    },
    methods:{
        tiggleMneu:function(data){
            //先把都变成false在点击的变成true
            this.menuTab.forEach(element => {
                element.current=false
            });
            data.current=true
            this.model=data.type
        },

        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
     
    }    
}
</script>
<style lang="scss" scoped>
#login{
    height: 100vh;
    background-color: #344a5f;
}
.login-wrap {
    width: 330px;
    margin: auto;
    padding-top: 80px;
}
.menu-tab {
    text-align: center;
    li {
        display: inline-block;
        font-size: 14px;
        width: 88px;
        line-height: 36px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }
    .current{
        background-color: rgba(0,0,0,.1);
    }
}
.login-form{
    margin-top: 23px;
    label{
        // margin-top: 3px;
        color: white;
        font-size: 14px;
        display: block;
    }
    .item-from{

    }
    .block{
        display:block;
        width: 100%;
        text-align: center;
        font-size: 14px;
        span{
        margin-left: -13px;
    }
    }

}
</style>