import Image from 'next/image'

import style from '../../style/authLayout.module.css'

import fork_B from '../../public/login/img_fork_B.png'
import fork_G from '../../public/login/img_fork_G.png'
import fork_Y from '../../public/login/img_fork_Y.png'
import spoon_R from '../../public/login/img_spoon_R.png'
import spoon_G from '../../public/login/img_spoon_G.png'
import spoon_Y from '../../public/login/img_spoon_Y.png'
import knife_R from '../../public/login/img_knife_R.png'
import knife_G from '../../public/login/img_knife_G.png'
import knife_Y from '../../public/login/img_knife_Y.png'
import logo_pc from '../../public/login/logo_pc.png'

export default function Layout({ children }) {
    return (
      <div>
        <div className={style.top_container}>
            <Image src={logo_pc} alt="Querico로고" className={style.logo_img} />
        </div>
        {children}
        <div className={style.bottom_container}>
            <div className={style.img_container}>
                <Image src={fork_G} alt="포크이미지" className={style.fork_img} />
                <Image src={knife_Y} alt="칼이미지" className={style.knife_img} />
                <Image src={spoon_R} alt="수저이미지" className={style.spoon_img} />
                <Image src={fork_B} alt="칼이미지" className={style.fork_img} />
                <Image src={knife_G} alt="포크이미지" className={style.knife_img} />
                <Image src={spoon_Y} alt="수저이미지" className={style.spoon_img} />
                <Image src={fork_B} alt="포크이미지" className={style.fork_img} />
                <Image src={knife_R} alt="칼이미지" className={style.knife_img} />
                <Image src={spoon_G} alt="수저이미지" className={style.spoon_img} />
                <Image src={fork_Y} alt="포크이미지" className={style.fork_img} />
            </div>
        </div>
      </div>        
    )
  }