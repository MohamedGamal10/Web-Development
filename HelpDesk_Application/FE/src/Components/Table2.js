import { useEffect } from 'react';
import axios from 'axios';
const App = () => {
    useEffect(() => {
        const postTodo = () => {
            const data = {
              msisdn: msisdn,
                imsi: imsi,
                problem_case:problem_case,problem_input: problem_input,
                datefrom: datefrom,dateto: dateto,action: action,
                solving_comment: solving_comment,other_comments: other_comments
            };
            const headers = { 'header-name': 'value' };
            const config = { headers, };
            axios
                .post(
                    'http://localhost:8000/select',
                    data,
                    config,
                )
                .then((response) => {
                    console.log(response.status);
                    console.log(response.data);
                })
                .catch((e) => console.log('something went wrong :(', e));
        };
        postTodo();
    }, []);
    return <div>POST REQUEST</div>;
};
export default App;