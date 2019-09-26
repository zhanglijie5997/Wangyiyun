import * as React from 'react';
import Swipers from 'swiper';
import 'swiper/css/swiper.min.css'
const Swiper = (props: any) => {
    const [getSwiper,setSwiper] = React.useState<any>();
    const swiperRef: any = React.useRef();
    React.useEffect(() => {
        const swiper = new Swipers(swiperRef.current,{
            autoplay:{
                stopOnLastSlide:true
            },
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
        })
        setSwiper(swiper)
        return () => getSwiper()
    },[])
    const bannerList = props.banners.map((data: any, index: number): JSX.Element => {
        return (
            // <li key={index} style={{ background: `url(${data.imageUrl}) no-repeat` }} />
            <div key={index} className="swiper-slide" style={{ background: `url(${data.imageUrl}) repeat-x`, backgroundSize: `770px 336px` }} />
        )
    })
    return (
        <div className="swiper-container" style={{ height: '100%' }} ref={swiperRef}>
            <div className="swiper-wrapper" >
                {bannerList}
            </div>
            <div className="swiper-pagination" />
        </div>
    );
}

export default Swiper;
