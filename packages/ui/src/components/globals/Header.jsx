const Header = ({ title, subtitle }) => {
    return (
        <div className="m-7">
            <h2 className="text-xl text-grey-100 bold sx:mb-1">
                {title}
            </h2>
            <h5 className="text-base text-green-400">
                {subtitle}
            </h5>
        </div>
    );
};

export default Header;
