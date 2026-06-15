import Link from '@docusaurus/Link'
import { CUSTOM_VALUES } from '@site/src/constants/generated'
import CodeBlock from '@theme/CodeBlock'
import { ChangeEvent, ComponentType, ReactNode, SVGProps, useRef, useState } from 'react'
import QRCode, { QRCodeProps } from 'react-qr-code'
import styles from './index.module.css'
import LogoBTC from './logos/btc.svg'
import LogoETH from './logos/eth.svg'
import LogoKoFi from './logos/ko-fi.svg'
import LogoLiberapay from './logos/liberapay.svg'
import LogoPatreon from './logos/patreon.svg'

const { BTC_DONATION_ADDRESS, ETH_DONATION_ADDRESS } = CUSTOM_VALUES

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
              This button will open Liberapay in a new tab/window.
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
              This button will open Patreon in a new tab/window.
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
            <QRCode
              {...SHARED_QR_CODE_PROPS}
              value={BTC_DONATION_ADDRESS!}
            />
            <CodeBlock className={styles.codeBlock} language='plaintext'>
              {BTC_DONATION_ADDRESS}
            </CodeBlock>
          </div>
        )}
        {method === TippingMethod.ETH && (
          <div className={styles.methodDisplayContainer}>
            <QRCode
              {...SHARED_QR_CODE_PROPS}
              value={ETH_DONATION_ADDRESS!}
            />
            <CodeBlock className={styles.codeBlock} language='plaintext'>
              {ETH_DONATION_ADDRESS}
            </CodeBlock>
          </div>
        )}
      </div>
    </div>
  )
}

const SHARED_QR_CODE_PROPS: Pick<QRCodeProps, 'size' | 'className'> = {
  className: styles.qr,
  size: 200,
}
