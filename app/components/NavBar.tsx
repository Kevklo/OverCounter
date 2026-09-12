import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className='flex flex-col md:flex-row justify-around bg-orange-500 min-h-15 items-center mb-5'>
      <h1><Link href="./landing">OverCountered</Link></h1>
      <ul className='flex flex-col md:flex-row gap-20'>
        <li><Link href="./heroesList">Heroes</Link></li>
        <li>Team Counters</li>
        <li>Synergies</li>
      </ul>
    </nav>
  )
}

export default NavBar;