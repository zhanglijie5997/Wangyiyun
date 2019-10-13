import * as React from 'react';
import Swipers from 'swiper';
import "./Swiper.scss";
import 'swiper/css/swiper.min.css'

const Swiper = (props: any) => {
    const swiperRef: any = React.useRef(null);
    
    React.useEffect(() => {
        const slideChangeFn = () => {
            props.changeIndex(swiper.realIndex)
        }
        const swiper: Swipers = new Swipers(swiperRef.current,{
            // 自动轮播
            autoplay: {
                delay: 3000,
                // stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                // dynamicBullets: true,
                clickable: true, // 点击分页器
            },
            // 左右切换
            navigation: {
                nextEl: '.right',
                prevEl: '.left',
            },
            // 延迟加载
            lazy: {
                loadPrevNext: true,
            },
            watchSlidesProgress: true,
        });
        // 监听索引改变
        swiper.on('slideChange', slideChangeFn)
        return () => swiper.destroy(true,false)
    }, [])
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

export default (Swiper);
