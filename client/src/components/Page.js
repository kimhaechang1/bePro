import { useEffect,useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './css/Page.css';

const Page = (props) =>{

    const [currentMaxPage, setCurrentMaxPage] = useState(); // 현재 번호들 중 최대값
    const [currentNumberOfPage, setCurrentNumberOfPage] = useState(); // 현재 나타내어진 번호 개수
    const [searchParams,setSearchParams] = useSearchParams(); // url쿼리스트링 들고오기
    const [totalP, setTotalP] = useState(); // 총 페이지 수
    const [startNumber, setStartNumber] = useState(1); // 현재 시작번호
    
    useEffect(()=>{

        let endText = 0; // 총 페이지를 페이지당 게시글 개수로 나누고 남은 페이지들
        let totalPage = 1; // 총 페이지 수
        let current_max_page = 0; // 현재 번호들 중 최대값
        const current_page_num = parseInt(searchParams.get(`${props.query}`)); // 현재 쿼리스트링 페이지변호

        if(current_page_num > props.maxPage){
            let newStartPage = 1 + (props.maxPage*Math.ceil(current_page_num/props.maxPage-1));
            setStartNumber(newStartPage);
        }

        if(props.limit<props.total){
            totalPage = Math.ceil(props.total/props.limit); 
            endText = props.total % props.limit; 
        }

        if(totalPage - startNumber + 1 >= props.maxPage){
            current_max_page = startNumber + props.maxPage - 1;
            setCurrentNumberOfPage(props.maxPage);

        }else{
            current_max_page = startNumber + totalPage % props.maxPage -1;
            setCurrentNumberOfPage(totalPage % props.maxPage);
        }

        setTotalP(totalPage);
        setCurrentMaxPage(current_max_page);
        
    },[props, searchParams, startNumber])

    const onPrevClickHandler = () =>{
        if(parseInt(searchParams.get(`${props.query}`))-1>=1){
            if(parseInt(searchParams.get(`${props.query}`))-1 < startNumber){
                setStartNumber(startNumber-props.maxPage);
            }
            const queryValue = parseInt(searchParams.get(props.query));
            searchParams.set(props.query, queryValue-1);
            setSearchParams(searchParams);
        }
    }

    const onNextClickHandler = () =>{
        if(parseInt(searchParams.get(`${props.query}`))+1<=totalP){
            if(parseInt(searchParams.get(`${props.query}`))+1 > currentMaxPage){
                setStartNumber(startNumber+props.maxPage);
            }
            const queryValue = parseInt(searchParams.get(props.query));
            searchParams.set(props.query, queryValue+1);
            setSearchParams(searchParams);
        }
        
    }

    const onBeginClickHandler = () =>{
        searchParams.set(props.query, 1);
        setSearchParams(searchParams);
        setStartNumber(1);
    }

    const onEndClickHandler = () =>{
        searchParams.set(props.query, totalP);
        setSearchParams(searchParams);
        setStartNumber(Math.ceil(totalP/props.maxPage)*props.maxPage-props.maxPage+1);
        
    }

    return (
        <div className="PageFrame">
            <div onClick={onBeginClickHandler} className="onCursor">Begin</div>
            <div onClick={onPrevClickHandler} className="PagePrev onCursor">Prev</div>
            <div className="PageList">
                {Array(currentNumberOfPage).fill(startNumber).map((value, index)=>{
                    return <div onClick={()=>{
                        searchParams.set(props.query,value+index);
                        setSearchParams(searchParams);
                    }}className={parseInt(searchParams.get(props.query)) === value+index? "PageEle selected onCursor" : `PageEle onCursor`}>{value+index}</div>
                })}
            </div>
            <div onClick={onNextClickHandler} className="PageNext onCursor">Next</div>
            <div onClick={onEndClickHandler} className="onCursor">End</div>
        </div>
    )
}
export default Page;