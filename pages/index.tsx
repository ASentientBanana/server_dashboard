import { FormEvent, FormEventHandler, useState } from 'react';
import { Button, Container, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Files } from '../services/FSAdapter';
import { withServerSession } from '../services/session';
import getConfig from 'next/config';
import { File } from '../types/file';

export const getServerSideProps = withServerSession(async () => {

  const args = await Files.loadDeploymentArgs('react');
  const deployments = await Files.getDeploymentScripts();
  const { serverRuntimeConfig } = getConfig();
  const baseUrl = process.env.baseUrl

  return {
    props: {
      baseUrl,
      users: [],
      args,
      deployments
    }
  }
})

interface IProps {
  users: any,
  args: string[],
  baseUrl: string,
  deployments: File[]
}

const Home = ({ args, baseUrl, deployments }: IProps) => {

  const [localProjectName, setLocalProjectName] = useState('');
  const [gitLink, setGitLink] = useState('');
  const [projectType, setProjectType] = useState('react');

  const handleAddProjectSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${baseUrl}/api/deployment/remote`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectName: localProjectName.replaceAll(' ', '-'),
        gitLink,
        projectType
      })
    });
    const data = await res.json();
    console.log(data)
  }


  return (
    <Container>
      <>
        <section id='add-project'>
          <br />
          <h1>
            {baseUrl}
          </h1>
          <Form onSubmit={handleAddProjectSubmit}>
            <FormGroup>
              <Form.Label>Project name</Form.Label>
              <FormControl type='text' onChange={(e) =>
                setLocalProjectName(e.target.value)}
                value={localProjectName}
                placeholder='Name of the project' />
            </FormGroup>
            <FormGroup>
              <Form.Label>Github link</Form.Label>
              <FormControl type='text' onChange={(e) =>
                setGitLink(e.target.value)}
                value={gitLink}
                placeholder='github link' />
            </FormGroup>
            <FormGroup>
              <Form.Label>project type</Form.Label>
              <Form.Select defaultValue={deployments[0].name}>
                {deployments.map((deployment, i) => (
                  <option value={deployment.name}>
                    {deployment.name}
                  </option>
                ))}
              </Form.Select>

              {/* <FormControl type='text' placeholder='github link' /> */}
            </FormGroup>
            <Button type='submit'>
              Deploy project
            </Button>
          </Form>
        </section>
      </>
    </Container>
  )
}

export default Home

