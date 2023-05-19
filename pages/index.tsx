import { Container } from '@mui/system';
import Header from '../components/header'
import Footer from "@/components/footer";

export default function Home() {
    return (
      <Container maxWidth="lg">
                <Header/>
      <p>ceci est un text</p>
      <Footer/>
      </Container>


    )
  }
  