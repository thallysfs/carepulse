"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = async ({params, searchParams}: SearchParamProps) => {
  const { userId } = await params
  const { appointmentId } = await searchParams
  console.log("🚀 ~ Success ~ appointmentId:", appointmentId)


  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className='success-img'>
        <Link href='/'>
          <Image 
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        
        <section className='flex flex-col items-center'>
          <Image 
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className='header mb-6 max-w-[600px] text-center'>
            Sua <span className='text-green-500'> consulta</span> foi agendada com sucesso
          </h2>
          <p>Entraremos em contato em breve para confirmar o agendamento.</p>
        </section>

        <section className='request-details'>
          <p>Detalhes da consulta agendada:</p>
          <div>
            {/* <Image 

            /> */}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Success