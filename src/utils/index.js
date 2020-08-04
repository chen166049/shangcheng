//默认导出
import { Dialog } from 'vant'
export default {
    checkLogin(next,to) {
        //检测登录没有
        if (localStorage.getItem('user')) {
            next()
        } else {
            Dialog.confirm({
                title: '检测到你现在没有登录',
                message: '是否跳转到登录页面'
            }).then(() => {
                // on confirm
                to()            
            })
                .catch(() => {
                    // on cancel
                });
        }
    },
    //加入收藏列表和最近浏览是一样
    addColiction(username, name, item) {
        //每个用户进来收藏和最近浏览不一样的
        //存储在本地localStorage里面
        //数组  标识每个用户
        //用户名是唯一的
        //收藏列表: 名字叫 用户名 + collction
        //最近浏览: 名字叫 用户名 + browser


        // 先判断localStorage里面有没有收藏或者浏览的列表
        let user = username + name
        if (localStorage.getItem(user)) {
            let arr = JSON.parse(localStorage.getItem(user))
            //去重的逻辑
            // let arr2 = arr
            let arr2 = arr.filter((item1) => {
                return item1._id === item._id
            })
            // console.log(arr,'原数据')
            // console.log(arr2,'现数据')
            if (arr2.length === 0) {
                arr.unshift(item)
                localStorage.setItem(user, JSON.stringify(arr))
            }
        } else {
            let arr = []
            arr.unshift(item)
            localStorage.setItem(user, JSON.stringify(arr))
        }

    }
}