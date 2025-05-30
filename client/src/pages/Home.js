import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';
import { GestPost } from '../api';

const Container = styled.div`
height: 100%;
${'' /* overflow-y: scroll; */}
background: ${({ theme }) => theme.bg};
padding: 30px 30px;
padding-bottom: 50px;
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
media (max-width: 768px) {
    padding: 6px 10px;
}
`;

const Headline = styled.div`
font-size: 34px;
font-weight: 500;
color: ${({ theme }) => theme.text_primary};
display: flex;
align-items: center;
flex-direction: column;

@media (max-width: 768px) {
    font-size: 22px;
}
`;
const Span = styled.div`
font-size: 30px;
font-weight: 800;
color: ${({ theme }) => theme.secondary};

@media (max-width: 768px) {
    font-size: 18px;
}
`;

const Wrapper = styled.div`
width: 100%;
max-width: 1400px;
padding: 32px 0px;
display: flex;
justify-content: center;
`;

const CardWrapper = styled.div`
display: grid;
gap: 20px;
@media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
}
@media (min-widht: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
}
@media(max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
}
`

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);

     useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
             await GestPost().then((res) => {
              setPosts(res.data.posts);
              setFiltered(res.data.posts);
             }); // Ensure response data matches your item shape
            } catch (err) {
              console.error("Failed to fetch posts", err);
            } finally {
              setLoading(false);
            }
          };
    
          fetchPosts();
     }, []);

     const handleSearch = (query) => {
        const lower = query.toLowerCase();
        const filteredPosts = posts.filter(
          (post) =>
            post.prompt.toLowerCase().includes(lower) ||
            post.author.toLowerCase().includes(lower)
        );
        setFiltered(filteredPosts);
    };

    // console.log(item);
  return (
    <Container>
        <Headline>
            Explore the world of AI Images
            <Span>✦ Generated with AI ✦</Span>
        </Headline>
        <SearchBar onSearch={handleSearch} />
        <Wrapper>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <CardWrapper>
            {filtered.map((item, index) => (
              <ImageCard key={index} item={item} />
            ))}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  )
}
export default Home