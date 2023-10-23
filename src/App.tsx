import { Input, Button } from './components'
import image1 from './assets/images/1.jpg'
import image2 from './assets/images/2.jpg'
import image3 from './assets/images/3.jpg'
import image4 from './assets/images/4.jpg'
import image5 from './assets/images/5.jpg'
import image6 from './assets/images/6.jpg'
import image7 from './assets/images/7.jpg'
import image8 from './assets/images/8.jpg'
import image9 from './assets/images/9.jpg'
import image10 from './assets/images/10.jpg'
import image11 from './assets/images/11.jpg'
import image12 from './assets/images/12.jpg'
import image13 from './assets/images/13.jpg'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ChangeEvent, useRef, useState } from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const images = [{
  url: image1,
}, {
  url: image2,
}, {
  url: image3,
}, {
  url: image4,
}, {
  url: image5,
}, {
  url: image6,
}, {
  url: image7,
}, {
  url: image8,
}, {
  url: image9,
}, {
  url: image10,
}, {
  url: image11,
}, {
  url: image12,
}, {
  url: image13,
}]

const properties = {
  duration: 5000,
  autoplay: true,
  transitionDuration: 500,
  arrows: false,
  infinite: true,
  easing: "ease",
};

interface ConvertLinkResponse {
  original_link: string
  converted_link: string
}

function App() {
  const [ouoLink, setOuoLink] = useState('')
  const [errorMessage, setErrorMessage] = useState<undefined | string>()
  const [loading, setLoading] = useState(false)
  const [convertLink, setConvertLink] = useState('')
  const slideRef = useRef()
  const handleNextBackground = () => {
    // @ts-ignore
    slideRef.current?.goNext();
  }

  const handlePrevBackground = () => {
    // @ts-ignore
    slideRef.current?.goBack();
  }

  const handleConvertLink = async () => {
    try {
      setErrorMessage('')
      setLoading(true)
      const response = await fetch('https://mrcong-convert-ouo-io-link.onrender.com/api/convert-link', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: ouoLink.trim()
        })
      })
      if (!response.ok) throw new Error('Cannot convert this link!')
      const result = await response.json() as ConvertLinkResponse;
      setConvertLink(result.converted_link)
    } catch (error) {
      setErrorMessage('Cannot convert this link!')
    } finally {
      setLoading(false)
    }
  }

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOuoLink(e.target.value)
  }

  return (
    <div className="app" >
      <div className='app__left-side'>
        <h1 className='app__title'>Convert OUO Link</h1>
        <div className='app__form'>
          <div className='app__form-control'>
            <Input placeholder='Ouo link' value={ouoLink} onChange={handleTextChange} disabled={loading} />
            <div className={`app__error-message ${errorMessage ? 'app__error-message--active' : ''}`}>{errorMessage}</div>
          </div>

          <textarea placeholder='Converted link' value={convertLink} disabled rows={20} className='app__input'></textarea>
          <div><Button name='btnConvert' onClick={handleConvertLink} disabled={loading} customClass='button--wide'>Convert</Button></div>
        </div>
      </div>
      <div className='app__right-side'
      >
        {/* @ts-ignore */}
        <Slide ref={slideRef} {...properties}>
          {
            images.map(image => (
              <img src={image.url} alt={image.url} key={image.url} className='app-right-side__image' />
            ))
          }
        </Slide>
        <FiChevronLeft className='app-right-side__icon icon-left' fontSize={40} onClick={handlePrevBackground} />
        <FiChevronRight className='app-right-side__icon' fontSize={40} onClick={handleNextBackground} />
      </div>

    </div>
  )
}

export default App
