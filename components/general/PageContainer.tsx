import styled from "styled-components";

const PageWrap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: lightgray;
  .content{
    margin: 24px;
    background: #f0f0f0;
    border: 4px solid gray;
    border-radius: 8px;
    min-height: 600px;
    min-width: 400px;
    padding: 24px;
    max-width: 1024px;
  }
`
const PageContainer =  ({children}:{children:any}) => {
    return <PageWrap>
        <div className={'content'}>
            {children}
        </div>
    </PageWrap>
}

export default PageContainer
