
import Image from 'next/image'
import Link from 'next/link'

import { Doctors } from '@/constants'
import { getAppointments } from '@/lib/actions/appointment.actions'
import { formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'


const Success = async ({params, searchParams}: SearchParamProps) => {
  const { userId } = await params
  const { appointmentId } = await searchParams || ''
  const appointment = await getAppointments(appointmentId as string);

  const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)


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
          <p>Detalhes do agendamento:</p>
          <div className="flex items-center gap-3">
            <Image 
              src={doctor?.image!}
              alt='doctor'
              width={100}
              height={100}
              className='size-6'
            />
            <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
          </div>
          <div className='flex gap-2'>
            <Image 
              src="/assets/icons/calendar.svg"
              alt='calendar'
              width={24}
              height={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button className='shad-primary-btn' variant='outline' asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            Nova consulta
          </Link>
        </Button>

        <p className='copyright'>
            © 2025 CarePulse
          </p>
      </div>
    </div>
  )
}

export default Success