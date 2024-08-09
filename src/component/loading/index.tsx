import style from './loading.module.css'

const Loading = () => {
    return (
        <section className={style.loading_wrap}>
            <p className={style.loading}>Sebentar ya...</p>
        </section>
    )
}

export default Loading