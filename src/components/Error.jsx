import { Link } from 'react-router-dom';

export default function Error({ detail }) {
    return (
        <>
            <main>
                <div className="hero">
                    <section className="hero-content">
                        <h2 className="subtitle">Erreur 404</h2>
                        <p className="text">
                            {detail
                                ? detail
                                : "Oups ! La page que vous demandez n'existe pas."}
                        </p>
                        <p></p>
                        <Link className="text" to="/">
                            Retournez sur la page d'accueil
                        </Link>
                    </section>
                </div>
            </main>
        </>
    );
}
