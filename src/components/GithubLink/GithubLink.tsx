import reactLogo from "@assets/logos/GitHub-Mark-64px.png";

function GithubLink() {
    return (
        <div>
            <a
                href="https://github.com/github-bdem/goto.pizza"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={reactLogo} alt="Github Link" />
            </a>
        </div>
    );
}

export default GithubLink;
