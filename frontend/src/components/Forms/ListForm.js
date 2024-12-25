import React, { useState, useEffect } from 'react';
import { authorizedApi } from '../../services/api';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ListForm = (props) => {
    const bookid = props.bookid;
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchLists = async (bookid) => {
        try {
            const response = await authorizedApi.get(`/list/${bookid}/getlistsofbook`);
            console.log(response.data);
            setLists(response.data);
        } catch (error) {
            console.error('Failed to fetch lists', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchLists(bookid);
    }, [bookid]);


    if (loading) {
        return <h4>Loading...</h4>;
    }

    const addtolist = async (e,listid) => {
        e.preventDefault();
        try{
            const response = await authorizedApi.post(`/list/${listid}/addbook`, { bookid }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Book added to list:', response.data);
            fetchLists(bookid)
        }
        catch (error) {
            console.error('adding failed', error);
        }
    }
    const removefromlist = async (e,listid) => {
        e.preventDefault();
        try{
            const response = await authorizedApi.delete(`/list/delete/${listid}/${bookid}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Book removed from list:', response.data);
            fetchLists(bookid)
        }
        catch (error) {
            console.error('removing failed', error);
        }
    }
    return(
        <>
        {lists.map((list)=>{
            return(
            <div key={list.listid}>
            <h3>{list.list_name}&nbsp;
            {list.bookid === null ? (
                <a  onClick={(e)=>{addtolist(e,list.listid)}} style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faPlusSquare} />
                </a>
            ) : (
                <a  onClick={(e)=>{removefromlist(e,list.listid)}} style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faMinusSquare} />
                </a>
            )}
            </h3>
        </div>)
        })}
        </>
    )
}


export default ListForm;