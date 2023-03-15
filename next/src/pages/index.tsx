import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { request } from '../utils/frontEnd';
import ClientTable from '../components/tables/client';

export type ClientsTypes = {
    id: string;
    avatar: string;
    birthday: Date;
    email: string;
    firstName: string;
    lastName: string;
    sex: string;
    supportTier: 'standard' | 'gold' | 'platinum';
    hourlyRate: number;
}

interface IndexPageProps {
    clients: ClientsTypes[];
}

const Index: React.FC<IndexPageProps> = ({ clients }) => {
    const onRegister = () => {
        console.log('onRegister');
    };

    return (
        <>
            <ClientTable clients={clients} onRegister={onRegister} />
        </>
    );
};

export default Index;

export const getServerSideProps = async () => {
    // get clients with request function
    const res = await request('GET', '/clients');

    // validation: if clients is undefined or null, return notfound.
    if (!res?.body) return { notFound: true }

    return { props: { clients: res.body.clients } };
};
