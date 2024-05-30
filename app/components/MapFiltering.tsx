"use client"
import React, { useCallback } from 'react';
import { categoryItems } from '../libs/categoryItems';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = {};

const MapFiltering = (props: Props) => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
 const search=searchParams.get('filter');

    const querySearch = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
        return params.toString();
    }, [searchParams]);

    return (
        <div className='flex overflow-scroll gap-x-2 w-[100vw] justify-between px-2 py-3 md:px-6'>
            {categoryItems.map((item) => (
                <Link className={cn("flex flex-col justify-center items-center",search==item.title?" border-b-2 border-black":"")} key={item.id} href={`${pathName}?${querySearch('filter', item.title)}`}>
                    
                        <div className='relative w-6 h-6'>
                            <Image src={item.imageUrl} alt='Image' width={35} height={35} />
                        </div>
                        <p className='font-medium text-xs'>{item.title}</p>
                  
                </Link>
            ))}
        </div>
    );
};

export default MapFiltering;
