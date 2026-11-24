import { Link } from 'react-router-dom';

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="ReleaseVantra, inicio">
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        ReleaseVantra<span className="brand-period">.</span>
      </span>
    </Link>
  );
}
