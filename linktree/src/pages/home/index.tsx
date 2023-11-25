import style from './home.module.css';
import Social from '../../components/Social';
import { FaGithub , FaYoutube, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { auth, db } from '../../services/firebaseConnection';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { getDocs, onSnapshot, query, orderBy, where, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinkProps {
  instagram?: string;
  linkedin?: string;
  github?: string;
}


interface UserProps {
  uid: string;
}

export default function Home() {
  const [user, setUser] = useState<UserProps | {}>({});
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinkProps>({});

  const navigate = useNavigate();

  async function logout() {
    await signOut(auth)
      .then(() => {
        toast.success('Deslogado com sucesso');
        navigate('/', { replace: true });
      })
      .catch(() => {
        toast.warning('Erro');
      });
  }

  useEffect(() => {
      async function loadSocialLinks(){
        const detailUser = localStorage.getItem('@reactlinks');
    if (detailUser) {
      const data: UserProps = JSON.parse(detailUser);
      setUser(data);

      const socialRef = collection(db, 'social');
      const q = query(socialRef, orderBy('created', 'asc'), where('userUid', '==', data?.uid));

      const unsub = onSnapshot(q, (snapshot) => {
        const socialLinksData: SocialLinkProps = {};
            snapshot.docs.forEach((doc)=>{
              const data = doc.data()
              socialLinksData.instagram = data.instagram;
              socialLinksData.linkedin = data.linkedin;
              socialLinksData.github = data.github;
            })
            setSocialLinks(socialLinksData);
      });
      return () => {
        unsub();
      };
    }
      }
      loadSocialLinks()
  }, []);



  useEffect(() => {
    function loadLinks() {
      const detailUser = localStorage.getItem('@reactlinks');
      if (detailUser) {
        const data: UserProps = JSON.parse(detailUser);
        setUser(data);

        const linksRef = collection(db, 'links');
        const queryRef = query(linksRef, orderBy('created', 'asc'), where('userUid', '==', data?.uid));
        const unsub = onSnapshot(queryRef, (snapshot) => {
          const lista = snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          }));
          setLinks(lista);
        });
      }
    }
    loadLinks();
  }, []);

  return (
    <div className='flex flex-col w-full py-4 items-center justify-center relative'>
      <Header />
      <h1 className='md:text-4xl text-3xl font-bold text-white mt-20'>Home</h1>
      <span className='text-gray-50 mb-5 mt-3'>Veja meus links</span>
      <main className='flex flex-col w-11/12 max-w-xl text-center'>
        {links.map((item) => (
          <section
            style={{ backgroundColor: item.bg }}
            key={item.id}
            className='bg-white mb-2 md-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer'
          >
            <a href={item.url} target='_blank'>
              <p style={{ color: item.color }} className='text-base md:text-lg'>
                {item.name}
              </p>
            </a>
          </section>
        ))}
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className='flex justify-center gap-3 my-4'>
          <Social url={socialLinks?.linkedin}>
            <FaLinkedin size={35} color='#fff' />
          </Social>
          <Social url={socialLinks?.instagram}>
            <FaInstagram size={35} color='#fff' />
          </Social>
          <Social url={socialLinks?.github}>
            <FaGithub size={35} color='#fff' />
          </Social>
        </footer>
        )}
      </main>
    </div>
  );
}