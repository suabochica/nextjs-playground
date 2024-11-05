import GetServerSidePropsContext  from 'next';

import Devit from "@/app/ui/devit/devit";
import { DevitProps } from "@/app/ui/devit/devit";  


interface DevitPageInitialProps {
  id: string;
  [key: string]: any;
}

export default function DevitPage(props: DevitProps) {
  console.log('DevitPage', props.id);
  return (
    <div>
     <Devit {...props} />  
    </div>
  );
}

DevitPage.getInitialProps = async (context: GetServerSidePropsContext): Promise<DevitPageInitialProps> => {
  const { query, res } = context;
  const { id } = query;

  console.log('getInitialProps', id);

  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`);

  if (apiResponse.ok) {
    return apiResponse.json();
  }

  if (res) {
    res.writeHead(301, { Location: '/home' });
    res.end();  
  }

  return { id: id as string };
}