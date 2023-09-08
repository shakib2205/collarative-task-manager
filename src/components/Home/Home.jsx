import img from '../../assets/img/home.jpeg'
const Home = () => {
    return (
        <div className='relative flex justify-end'>
            <h1  className='text-5xl text-center mt-10 absolute top-52 right-3'>Welcome to Task Management</h1>
            <img className='max-h-screen h-[630px] w-full' src={img} alt="" />
        </div>
    );
};

export default Home;