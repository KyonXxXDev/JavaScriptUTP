function Wave({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            className={className}
        >
            <path
                fill="currentColor"
                fillOpacity="1"
                d="M0,50L60,46.5C120,43,240,36,360,38C480,40,600,50,720,60C840,70,960,80,1080,75C1200,70,1320,50,1380,40L1440,30L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
            ></path>
        </svg>
    );
}
export default Wave;
