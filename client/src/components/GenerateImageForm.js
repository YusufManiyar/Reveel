import React from 'react'
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './button';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import { GenerateAIImage, CreatePost } from '../api';

const Form = styled.div`
    flex: 1;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 9%;
    justify-content:center;
`;
const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
  `;
const Title = styled.div`
    font-size: 28px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};`;
const Desc = styled.div`
    font-size: 17px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};`;
const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
`;
const Actions = styled.div`
    flex: 1;
    display: flex;
    gap: 8px;
`;

const GenerateImageForm = ({
    post, 
    setPost,
    CreatePostLoading,
    setGenerateImageLoading,
    generateImageLoading, 
    setGeneratePostLoading,
}) => {
    const generateImageFun = async () => {
        setGenerateImageLoading(true)
        await GenerateAIImage({prompt: post.prompt}).then((res) => {
            setPost({...post, photo: `data:image/jpge;base64,${res?.data?.photo}`});
            setGenerateImageLoading(false);
        }).catch((error) => {
            console.log(error)
        })
    };

    const createPostFun = async () => {
        setGeneratePostLoading(true);
        console.log("Post Data:", post);
        await CreatePost({author: post.author, prompt: post.prompt, photo: post.photo}).then((res) => {
            setPost({author: "", prompt: "", photo: ""}); // Clear fields after creating post
            setGeneratePostLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    };

  return (
    <Form>
        <Top>
            <Title>Generate Image With Prompt</Title>
            <Desc>
                Write a prompt to generate an image. You can use any prompt you want, but make sure it is not too long.
            </Desc>
        </Top>
        <Body>
            <TextInput 
                label="Author"
                placeholder="Enter your name..."
                name="name"
                value={post.author}
                handelChange={(e) => setPost({ ...post, author: e.target.value})}
            />
            <TextInput 
                label="Prompt"
                placeholder="Write a detailed prompt about the image..."
                name="prompt"
                rows="8"
                textArea
                value={post.promt}
                handelChange={(e)=>setPost({ ...post, prompt: e.target.value})}
            />
            ** You can post the AI Generate Image To the Community **
        </Body>
        <Actions>
            <Button text="Generate Image" flex leftIcon={<AutoAwesome />} isLoading={generateImageLoading} isDisabled={ post.prompt === "" } onClick={() => generateImageFun()} />
            <Button text="Post Image" flex type="secondary" leftIcon={<CreateRounded />} isLoading={CreatePostLoading} isDisabled={ post.name === "" || post.prompt === "" || post.photo === "" } onClick={() => createPostFun()} />
        </Actions>
    </Form>
  )
}

export default GenerateImageForm