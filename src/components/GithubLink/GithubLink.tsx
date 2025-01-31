import reactLogo from '@assets/GitHub-Mark-64px.png'

const GithubLink = () => {
    return (
        <div className="GithubLink">
            <a href="https://github.com/bdell/goto.pizza" target="_blank" rel="noopener noreferrer">
                <img src={reactLogo} alt="Github Link" />
            </a>
        </div>
    );
};

export default GithubLink;
