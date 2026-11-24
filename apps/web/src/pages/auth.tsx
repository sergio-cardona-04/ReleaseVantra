import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Check, CheckCircle2, LoaderCircle, ShieldCheck } from 'lucide-react';
import { Brand } from '@/components/brand';
import { Button } from '@/components/ui/button';
import { Alert, Select, Textarea } from '@/components/ui/primitives';
import { Field, PasswordField } from '@/components/form-fields';
import { plans, type Plan } from '@/mocks/data';

export function AuthPage({
  mode,
}: {
  mode: 'login' | 'register' | 'forgot' | 'organization' | 'invite';
}) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { token } = useParams();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const initialPlan = params.get('plan');
  const [plan, setPlan] = useState<Plan>(
    initialPlan === 'Business' || initialPlan === 'Enterprise' ? initialPlan : 'Team',
  );
  const [inviteMode, setInviteMode] = useState('existing');
  useEffect(() => () => clearTimeout(timer.current), []);
  const title =
    mode === 'register'
      ? 'Crea tu cuenta de administrador.'
      : mode === 'forgot'
        ? 'Recupera tu acceso.'
        : mode === 'organization'
          ? step === 1
            ? 'Elige un plan para tu equipo.'
            : step === 2
              ? 'Tu recorrido de registro.'
              : 'Un espacio para tu organización.'
          : mode === 'invite'
            ? 'Una invitación para tu equipo.'
            : 'Bienvenido de nuevo.';
  const invalidInvitation = mode === 'invite' && token !== 'demo';

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    for (const element of Array.from(form.elements)) {
      if (element instanceof HTMLInputElement && element.required) {
        if (!element.value.trim())
          next[element.name] =
            `Completa ${element.labels?.[0]?.textContent?.toLowerCase() ?? 'este campo'}.`;
        else if (element.type === 'email' && !element.validity.valid)
          next[element.name] = 'Escribe un correo electrónico válido.';
        else if (element.minLength > 0 && element.value.length < element.minLength)
          next[element.name] = `Usa al menos ${element.minLength} caracteres.`;
        else if (element.pattern && !element.validity.valid)
          next[element.name] = 'Usa letras minúsculas, números y guiones.';
      }
    }
    if (data.has('confirmation') && data.get('password') !== data.get('confirmation'))
      next.confirmation = 'Las contraseñas deben coincidir.';
    setErrors(next);
    setMessage('');
    if (Object.keys(next).length) {
      const first = form.elements.namedItem(Object.keys(next)[0] ?? '');
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    if (mode === 'register') {
      form.reset();
      void navigate(`/register/organization?plan=${plan}`);
      return;
    }
    if (mode === 'organization') {
      if (step === 0) setStep(1);
      else setStep(2);
      return;
    }
    setLoading(true);
    timer.current = setTimeout(() => {
      setLoading(false);
      form.reset();
      setMessage(
        mode === 'forgot'
          ? 'Vista conceptual: no se envió ningún correo de recuperación.'
          : mode === 'invite'
            ? 'Vista conceptual: no se aceptó ninguna invitación ni se creó una membresía.'
            : 'Inicio de sesión no disponible en A2. Usa «Explorar demostración» para recorrer la interfaz.',
      );
    }, 500);
  }

  return (
    <main id="main" className="auth-page">
      <aside className="auth-story">
        <Brand />
        <div>
          <span className="eyebrow">De la versión al despliegue</span>
          <h2>
            Tu equipo.
            <br />
            Tus cambios.
            <br />
            <span className="muted">El mismo contexto.</span>
          </h2>
          <p>
            Una experiencia diseñada para que cada solicitud tenga una decisión y cada decisión, un
            registro.
          </p>
          <div className="auth-story-bottom">
            <ShieldCheck size={20} />
            <span>Cinco roles. Responsabilidades claras.</span>
          </div>
        </div>
        <span className="muted">ReleaseVantra · Prototipo visual A2</span>
      </aside>
      <div className="auth-content">
        <div className="auth-form-wrap">
          <p className="step-label">
            {mode === 'register'
              ? '01 / Cuenta administradora'
              : mode === 'organization'
                ? `${step + 2 < 4 ? '0' : ''}${step + 2} / Organización y plan`
                : 'ReleaseVantra'}
          </p>
          <h1>{title}</h1>
          <p className="auth-intro">
            {mode === 'login'
              ? 'Continúa al espacio de trabajo de tu organización.'
              : mode === 'register'
                ? 'Diseña el primer paso de tu equipo en ReleaseVantra.'
                : mode === 'forgot'
                  ? 'Introduce tu correo para revisar la experiencia de recuperación.'
                  : mode === 'invite'
                    ? 'Revisa el contexto antes de continuar.'
                    : 'Recorre la configuración inicial de tu empresa.'}
          </p>
          <Alert>
            Prototipo visual. No se crean cuentas, organizaciones ni sesiones. Los formularios no
            envían ni guardan tus datos.
          </Alert>
          {invalidInvitation ? (
            <div className="form-stack">
              <h2>Invitación caducada o inválida</h2>
              <p>
                En esta demostración, solamente la ruta de ejemplo está disponible. Solicita una
                nueva invitación al administrador cuando el servicio esté implementado.
              </p>
              <Button asChild variant="secondary">
                <Link to="/invite/demo">Ver invitación de ejemplo</Link>
              </Button>
            </div>
          ) : mode === 'organization' && step === 2 ? (
            <div className="form-stack">
              <CheckCircle2 size={32} />
              <h2>Vista de confirmación conceptual</h2>
              <dl className="detail-list">
                <div>
                  <dt>Organización introducida</dt>
                  <dd>{name}</dd>
                </div>
                <div>
                  <dt>Slug</dt>
                  <dd>{slug}</dd>
                </div>
                <div>
                  <dt>Plan elegido</dt>
                  <dd>{plan} · simulado</dd>
                </div>
              </dl>
              <p>
                No se creó una organización ni una cuenta. La demostración utiliza empresas
                ficticias independientes de este formulario.
              </p>
              <Button asChild>
                <Link to="/app">Explorar demostración</Link>
              </Button>
              <Button variant="secondary" onClick={() => setStep(0)}>
                Revisar el recorrido
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="form-stack">
              {mode === 'invite' && (
                <>
                  <div className="invite-context">
                    <strong>Astera Digital</strong>
                    <span>Rol previsto: DEVELOPER</span>
                    <span>Invitación de ejemplo · Sin token real</span>
                  </div>
                  <label htmlFor="invite-account">Tipo de cuenta</label>
                  <Select
                    id="invite-account"
                    value={inviteMode}
                    onChange={(e) => setInviteMode(e.target.value)}
                  >
                    <option value="existing">Tengo una cuenta</option>
                    <option value="new">Crear una cuenta</option>
                  </Select>
                </>
              )}
              {(mode === 'register' || (mode === 'invite' && inviteMode === 'new')) && (
                <div className="form-row">
                  <Field
                    label="Nombre"
                    name="firstName"
                    autoComplete="given-name"
                    required
                    error={errors.firstName}
                  />
                  <Field
                    label="Apellidos"
                    name="lastName"
                    autoComplete="family-name"
                    required
                    error={errors.lastName}
                  />
                </div>
              )}
              {mode !== 'organization' && (
                <Field
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  error={errors.email}
                />
              )}
              {mode !== 'forgot' && mode !== 'organization' && (
                <PasswordField
                  name="password"
                  autoComplete={
                    mode === 'register' || inviteMode === 'new'
                      ? 'new-password'
                      : 'current-password'
                  }
                  required
                  minLength={8}
                  error={errors.password}
                />
              )}
              {(mode === 'register' || (mode === 'invite' && inviteMode === 'new')) && (
                <PasswordField
                  label="Confirmar contraseña"
                  name="confirmation"
                  autoComplete="new-password"
                  required
                  error={errors.confirmation}
                />
              )}
              {mode === 'organization' && step === 0 && (
                <>
                  <Field
                    label="Nombre de la empresa"
                    name="organization"
                    required
                    value={name}
                    error={errors.organization}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!slugEdited)
                        setSlug(
                          e.target.value
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-|-$/g, ''),
                        );
                    }}
                  />
                  <Field
                    label="Slug de la organización"
                    name="slug"
                    required
                    pattern="[a-z0-9]+(-[a-z0-9]+)*"
                    value={slug}
                    error={errors.slug}
                    hint="Identificador con minúsculas, números y guiones."
                    onChange={(e) => {
                      setSlugEdited(true);
                      setSlug(e.target.value);
                    }}
                  />
                  <div className="field">
                    <label htmlFor="sector">Sector empresarial (opcional)</label>
                    <Select id="sector" name="sector">
                      <option value="">Selecciona un sector</option>
                      <option>Tecnología</option>
                      <option>Servicios</option>
                      <option>Comercio</option>
                      <option>Otro</option>
                    </Select>
                  </div>
                  <div className="field">
                    <label htmlFor="description">Descripción (opcional)</label>
                    <Textarea id="description" name="description" rows={3} maxLength={500} />
                  </div>
                </>
              )}
              {mode === 'organization' && step === 1 && (
                <fieldset className="plan-options">
                  <legend>Plan simulado</legend>
                  {plans.map((item) => (
                    <label
                      key={item.name}
                      className={plan === item.name ? 'plan-option selected' : 'plan-option'}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={item.name}
                        checked={plan === item.name}
                        onChange={() => setPlan(item.name)}
                      />
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.feature}</small>
                      </span>
                      <strong>
                        US${item.price}
                        <small>/mes</small>
                      </strong>
                      {plan === item.name && <Check size={16} />}
                    </label>
                  ))}
                </fieldset>
              )}
              {mode === 'login' && (
                <Link className="form-link" to="/forgot-password">
                  ¿Olvidaste tu contraseña?
                </Link>
              )}
              <Button type="submit" disabled={loading}>
                {loading && <LoaderCircle className="spin" size={17} />}
                {loading
                  ? 'Mostrando estado de carga…'
                  : mode === 'register'
                    ? 'Continuar a organización'
                    : mode === 'organization'
                      ? step === 0
                        ? 'Continuar a planes'
                        : 'Ver confirmación conceptual'
                      : mode === 'forgot'
                        ? 'Ver recuperación conceptual'
                        : mode === 'invite'
                          ? 'Revisar aceptación conceptual'
                          : 'Revisar inicio de sesión'}
              </Button>
              {Object.keys(errors).length > 0 && (
                <p role="alert" className="field-error">
                  Revisa los campos indicados.
                </p>
              )}
              {message && (
                <p role="status" className="form-message">
                  {message}
                </p>
              )}
              {mode === 'organization' && step === 1 && (
                <Button type="button" variant="secondary" onClick={() => setStep(0)}>
                  Volver a organización
                </Button>
              )}
            </form>
          )}
          <div className="auth-links">
            {mode === 'login' ? (
              <p>
                ¿Es tu primer equipo? <Link to="/register">Crear cuenta</Link>
              </p>
            ) : (
              <Link to="/login">Volver al inicio de sesión</Link>
            )}
            <Link to="/app">Explorar demostración</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
