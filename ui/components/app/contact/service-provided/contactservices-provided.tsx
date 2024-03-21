// AboutServicesProvided.tsx

import * as React from "react";
import Container from "@/components/hoc/container/container";
import Row from "@/components/hoc/row/row";
import styles from "./contactservices-provided.module.scss";


interface ServiceData {
  image: string;
  serviceName: string;
  serviceDescription: string;
  href: string;
}

interface ContactServicesProvidedProps {
  data: ServiceData[];
}

/**
   * Renders a section containing contact information blocks.
   * @returns elements - The rendered contact information section.
   */
/**
 * Renders the contact information section of the website.
 * @returns JSX element representing the contact information section.
 */
function ContactServicesProvided({ data }: ContactServicesProvidedProps) {
  return (
    <>
      <section className={styles.contactSection}>
        <Container>
          <div className={styles.contactWrapper}>
            <div className={styles.headingWrapper}>
              <h1>Contact Us<span className={styles.footerHeadingDot}>.</span></h1>
            </div>
          </div>
        </Container>
      </section>


      <section className={styles.contactBlocksSection}>
        <Container>
          <Row>
            {data.map((service, index) => (
              <div key={index} className={styles.contactblock}>
                <h3>{service.serviceName}</h3>
                <p>{service.serviceDescription}</p>
                {/* Use service.image and service.href as needed */}
              </div>
            ))}
          </Row>
        </Container>
      </section>


    </>
  );
}

export default ContactServicesProvided;
