import repos from '../scripts/response.json';
import { IParsedResponse, IIncomingResponse } from '../types/repo';
import RepositoryTile from '../components/RepositoryTile';
import RepositoryList from '../components/Repositorylist';

export const getServerSideProps = async () => {
    const parsedRepos = repos.map((element) => {
        return {
            id: element.id,
            name: element.name,
            private: element.private,
            language: element.language,
            updated_at: element.updated_at
        }
    })
    return {
        props: {
            repos: parsedRepos
        }
    }
}

const Projects = ({ repos }: { repos: IParsedResponse[] }) => {
    return (
        <RepositoryList >
            {repos.map((r, i) => (
                <RepositoryTile project={r} key={i} />
            ))}
        </RepositoryList>
    )
}

export default Projects
