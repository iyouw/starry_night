import { join, dirname} from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'site');

export default {
    site:{
        title:'sn doc site',
        description:'sn doc site for test',
        logo:'https://img.yzcdn.cn/vant/logo.png',
        outDir,
        nav:[
            {
                title:'基础组件',
                items:[
                    {
                        title:'按钮组件',
                        path:'Button'
                    }
                ]
            },
            {
                title:'反馈组件',
                items:[
                    {
                        title:'动作清单',
                        path:'ActionSheet'
                    }
                ]
            }
        ]
    }
}