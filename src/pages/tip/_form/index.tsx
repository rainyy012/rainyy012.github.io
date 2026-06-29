import Link from '@docusaurus/Link'
import { useWindowSize } from '@docusaurus/theme-common'
import { TOAST_TIMEOUT } from '@site/src/constants'
import { CUSTOM_VALUES } from '@site/src/constants/generated'
import { useConstant } from '@site/src/hooks/constant'
import CopyIcon from '@theme/Icon/Copy'
import SuccessIcon from '@theme/Icon/Success'
import ClipboardJS from 'clipboard'
import {
  ChangeEvent,
  ComponentType,
  MouseEvent,
  ReactNode,
  SVGProps,
  useCallback,
  useRef,
  useState,
} from 'react'
import QRCode from 'react-qr-code'
import { toast } from 'react-toastify'
import seedrandom from 'seedrandom'
import styles from './index.module.css'
import LogoBTC from './logos/btc.svg'
import LogoETH from './logos/eth.svg'
import LogoKoFi from './logos/ko-fi.svg'
import LogoLiberapay from './logos/liberapay.svg'
import LogoPatreon from './logos/patreon.svg'

const { BTC_DONATION_ADDRESSES, ETH_DONATION_ADDRESS } = CUSTOM_VALUES

enum TippingMethod {
  LIBERAPAY = 'LIBERAPAY',
  KO_FI = 'KO_FI',
  PATREON = 'PATREON',
  BTC = 'BTC',
  ETH = 'ETH',
}

interface ITippingOption {
  name: string
  value: TippingMethod
  logo: ComponentType<SVGProps<SVGSVGElement>>
}

const OPTIONS: Array<ITippingOption> = [
  {
    name: 'Liberapay',
    value: TippingMethod.LIBERAPAY,
    logo: LogoLiberapay,
  },
  {
    name: 'Patreon',
    value: TippingMethod.PATREON,
    logo: LogoPatreon,
  },
  {
    name: 'Ko-fi',
    value: TippingMethod.KO_FI,
    logo: LogoKoFi,
  },
  {
    name: 'Bitcoin',
    value: TippingMethod.BTC,
    logo: LogoBTC,
  },
  {
    name: 'Ethereum',
    value: TippingMethod.ETH,
    logo: LogoETH,
  },
]

export function TippingForm(): ReactNode {

  const [method, setMethod] = useState<TippingMethod | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const BTC_DONATION_ADDRESS = useConstant<string>(() => {
    return BTC_DONATION_ADDRESSES[
      Math.floor(BTC_DONATION_ADDRESSES.length * seedrandom(
        String(5 * Math.floor(new Date().getDate() / 5))
      )())
    ]
  })

  return (
    <div ref={containerRef} className={styles.container}>
      <ul className={styles.optionList}>
        {OPTIONS.map((option) => {
          if (
            (option.value === TippingMethod.BTC && !BTC_DONATION_ADDRESS) ||
            (option.value === TippingMethod.ETH && !ETH_DONATION_ADDRESS)
          ) { return }
          const Logo = option.logo
          return (
            <li key={option.value}>
              <label htmlFor={option.value}>
                <Logo height={32} width={32} />
                <span>{option.name}</span>
                <input
                  id={option.value}
                  type='radio'
                  name='type'
                  value={option.value}
                  checked={method === option.value}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.checked) {
                      setMethod(option.value)
                    }
                    setTimeout(() => {
                      containerRef.current?.scrollIntoView({
                        block: 'end',
                        behavior: 'smooth',
                      })
                    }, 10)
                  }}
                />
              </label>
            </li>
          )
        })}
      </ul>
      <hr />
      <div>
        {method === TippingMethod.LIBERAPAY && (
          <div className={styles.methodDisplayContainer} data-type='simple-button'>
            <div className={styles.buttonHeightStabilizer}>
              <Link href='https://liberapay.com/rainyy012/donate'>
                <img
                  src='https://liberapay.com/assets/widgets/donate.svg'
                  alt='Donate using Liberapay'
                  className={styles.buttonImg}
                />
              </Link>
            </div>
            <span className={styles.buttonHint}>
              This button will open Liberapay in a new tab.
            </span>
          </div>
        )}
        {method === TippingMethod.PATREON && (
          <div className={styles.methodDisplayContainer} data-type='simple-button'>
            <div className={styles.buttonHeightStabilizer}>
              <Link href='https://www.patreon.com/join/rainyy012'>
                <img
                  src='https://img.shields.io/badge/-Become_a_Patron-f96854?logo=Patreon&style=for-the-badge'
                  alt='Become a Patreon'
                  className={styles.buttonImg}
                />
              </Link>
            </div>
            <span className={styles.buttonHint}>
              This button will open Patreon in a new tab.
            </span>
          </div>
        )}
        {method === TippingMethod.KO_FI && (
          <div className={styles.methodDisplayContainer}>
            <iframe
              className={styles.kofiIframe}
              src='https://ko-fi.com/rainyy012/?hidefeed=true&widget=true&embed=true&preview=true'
              height={680}
              title='rainyy012'
            />
            <span>
              <span className={styles.buttonHint}>{'Please click '}</span>
              <Link href='https://ko-fi.com/C2A420F31Y' style={{ fontSize: '12pt' }}>here</Link>
              <span className={styles.buttonHint}>{' if the embedded form does not load.'}</span>
            </span>
          </div>
        )}
        {method === TippingMethod.BTC && (
          <div className={styles.methodDisplayContainer}>
            <QRCodeAndAddress address={BTC_DONATION_ADDRESS!} />
          </div>
        )}
        {method === TippingMethod.ETH && (
          <div className={styles.methodDisplayContainer}>
            <QRCodeAndAddress address={ETH_DONATION_ADDRESS!} />
          </div>
        )}
      </div>
    </div>
  )

}

interface QRCodeAndAddressProps {
  address: string
}

const selectAllOnClick = (e: MouseEvent<HTMLTextAreaElement>) => {
  (e.target as HTMLTextAreaElement).select()
}

function QRCodeAndAddress({ address }: QRCodeAndAddressProps): ReactNode {

  const windowsize = useWindowSize()
  const [isCopied, setCopyState] = useState(false)
  const onCopy = useCallback(() => {
    try {
      ClipboardJS.copy(address)
      toast.success('Address copied!')
      setCopyState(true)
      setTimeout(() => { setCopyState(false) }, TOAST_TIMEOUT)
    } catch (error) {
      toast.error('Unable to copy address')
      console.error(error)
    }
  }, [address])

  const DisplayIcon = isCopied ? SuccessIcon : CopyIcon

  return (
    <>
      <QRCode
        className={styles.qr}
        size={200}
        value={address}
      />
      <textarea
        className={styles.address}
        data-is-mobile={windowsize === 'mobile'}
        value={address.replace(/(.{4})/g, '$1 ')}
        readOnly
        onClick={selectAllOnClick}
      />
      <button
        className={`button button--${isCopied ? 'success' : 'primary'} ${styles.copyButton}`}
        onClick={onCopy}
      >
        <DisplayIcon height={20} />
        Copy address
      </button>
    </>
  )
}
