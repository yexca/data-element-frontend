// 进行多语言支持配置
import Vue from 'vue'; // 引入Vue
import VueI18n from 'vue-i18n';
import store from '@/store';

import locale from 'element-ui/lib/locale';
import elementEN from 'element-ui/lib/locale/lang/en';
import elementCN from 'element-ui/lib/locale/lang/zh-CN';
import elementJP from 'element-ui/lib/locale/lang/ja';

import customCN from './zh';
import customEN from './en';
import customJP from './jp';

Vue.use(VueI18n); // 全局注册国际化包

// 创建国际化插件的实例
const i18n = new VueI18n({
    // 指定语言类型
    locale: store.state.locale,
    // 将ElementUI语言包加入到插件语言数据里
    messages: {
        en: {
            ...elementEN,
            ...customEN
        },
        zh: {
            ...elementCN,
            ...customCN
        },
        jp: {
            ...elementJP,
            ...customJP
        }
    }
});

// 配置ElementUI语言转换关系
locale.i18n((key, value) => i18n.t(key, value));

export default i18n;