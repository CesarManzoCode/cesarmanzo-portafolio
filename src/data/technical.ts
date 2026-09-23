/* ==================================================================== *
 * Technical — the engineering layer.
 *
 * Not “projects with longer descriptions”: each entry is organised by
 * the questions a technical reader asks — how it is built, what must
 * always hold, where trust ends, what was measured, what failed, and
 * what is not proven. A section only exists when the project has
 * evidence for it.
 *
 * Numbers are copied from the project’s repository or documentation.
 * Commands are the repository’s own; nothing here is invented output.
 * ==================================================================== */

import type { Depth, MediaKey, T } from './projects';

export type SectionKind =
  | 'architecture'
  | 'invariants'
  | 'trust'
  | 'evidence'
  | 'measurements'
  | 'experiments'
  | 'failures'
  | 'limitations'
  | 'notProven'
  | 'nonClaims'
  | 'reproduce';

export type Block =
  | { p: T }
  | { list: T[] }
  /** Title + body rows: for findings, failures, invariants. */
  | { items: { title: T; body: T }[] }
  | { table: { head: T[]; rows: (T | string)[][] } }
  /** Literal commands or a pipeline — never fabricated output. */
  | { code: string; caption?: T }
  | { figure: MediaKey; caption: T; alt: T; zoom?: 'md' | 'lg'; dark?: boolean };

export type TechSection = { kind: SectionKind; title?: T; blocks: Block[] };

export type TechDoc = {
  slug: string;
  depth: Depth;
  /** One precise sentence, allowed to be technical. */
  abstract: T;
  /** The strongest measured / verified numbers. */
  headline: { value: string | T; label: T }[];
  /** The single most important limitation — shown in the index too. */
  caveat: T;
  sections: TechSection[];
  sources: { label: T; href: string }[];
};

const GH = 'https://github.com/CesarManzoCode';
const s = (en: string, es: string): T => ({ en, es });

export const TECH: TechDoc[] = [
  /* ================================================================ *
   * Thalyx — full deep dive
   * ================================================================ */
  {
    slug: 'thalyx',
    depth: 'deep',
    abstract: s(
      'An experimental OS over a managed Linux kernel: one trusted core, a complete human route, and an agent route that can only propose. Grants are enforced in-kernel through BPF LSM; modules run isolated with namespaces, cgroups and seccomp.',
      'Un SO experimental sobre un kernel de Linux administrado: un único núcleo confiable, una vía humana completa y una vía del agente que solo puede proponer. Los permisos se hacen cumplir en el kernel con BPF LSM; los módulos corren aislados con namespaces, cgroups y seccomp.',
    ),
    headline: [
      { value: '156', label: s('proven — verify.sh on real hardware, 2026-08-25', 'probados — verify.sh en hardware real, 2026-08-25') },
      { value: '2', label: s('not proven, named in the run’s own summary', 'no probados, nombrados en el propio resumen de la corrida') },
      { value: '0', label: s('failed', 'fallidos') },
      { value: '1,600+', label: s('tests in the workspace', 'pruebas en el workspace') },
    ],
    caveat: s(
      'No tier of the local model abstained even once on ambiguous input — the design calls abstention its most important measurement.',
      'Ningún nivel del modelo local se abstuvo ni una vez ante entradas ambiguas — el diseño considera la abstención su medición más importante.',
    ),
    sections: [
      {
        kind: 'architecture',
        blocks: [
          {
            p: s(
              'The machine image is the Linux kernel and one program. That program is the core — the only trusted component — and it drives the module sandbox, a Btrfs store written directly (no mkfs.btrfs) and an append-only journal. Linux is treated as an engine Thalyx manages, not a host it rests on.',
              'La imagen de la máquina es el kernel de Linux y un solo programa. Ese programa es el núcleo — el único componente confiable — y maneja el sandbox de módulos, un almacén Btrfs escrito directamente (sin mkfs.btrfs) y un journal de solo anexado. Linux se trata como un motor que Thalyx administra, no como un anfitrión sobre el que se apoya.',
            ),
          },
          {
            figure: 'thalyx-architecture',
            dark: true,
            zoom: 'lg',
            alt: s(
              'Diagram: the human reaches the Thalyx core by a complete route and the agent by a proposal-only route; the core drives the module sandbox, the Btrfs store and the journal; the BPF LSM in the kernel turns grants into policy.',
              'Diagrama: la persona llega al núcleo de Thalyx por una vía completa y el agente por una vía de solo propuestas; el núcleo maneja el sandbox, el almacén Btrfs y el journal; el BPF LSM del kernel convierte los permisos en política.',
            ),
            caption: s(
              'Two routes reach the core; only the human one is complete, and only the core is trusted.',
              'Dos vías llegan al núcleo; solo la humana es completa, y solo el núcleo es confiable.',
            ),
          },
          {
            items: [
              {
                title: s('Modules', 'Módulos'),
                body: s(
                  'Signed .thmod bundles (ed25519). Each runs with its own uid, a pivoted root, a seccomp filter and a cgroup, and has no terminal — everything it says reaches the user through Thalyx, labelled.',
                  'Paquetes .thmod firmados (ed25519). Cada uno corre con su propio uid, una raíz pivotada, un filtro seccomp y un cgroup, y no tiene terminal — todo lo que dice le llega al usuario a través de Thalyx, etiquetado.',
                ),
              },
              {
                title: s('Kernel policy', 'Política del kernel'),
                body: s(
                  'A grant becomes a bit in a BPF map, loaded by Thalyx’s own BPF loader (no libbpf, no bpftool). What was not granted is denied by the BPF LSM inside the kernel.',
                  'Un permiso se vuelve un bit en un mapa BPF, cargado por el propio loader BPF de Thalyx (sin libbpf, sin bpftool). Lo que no se concedió lo niega el BPF LSM dentro del kernel.',
                ),
              },
              {
                title: s('Semantic tooling', 'Herramientas semánticas'),
                body: s(
                  'A structured programmatic surface for agents: `contexto` answers what a name is (kind, crate, signature, uses) in a few hundred bytes, backed by rust-analyzer; `hacer` runs a short JavaScript program in an embedded QuickJS inside a reversible boundary — commit or roll the tree back — with eight separate ceilings so `while (true) {}` terminates.',
                  'Una superficie programática estructurada para agentes: `contexto` responde qué es un nombre (tipo, crate, firma, usos) en unos cientos de bytes, apoyado en rust-analyzer; `hacer` corre un programa corto de JavaScript en un QuickJS embebido dentro de una frontera reversible — confirmar o regresar el árbol — con ocho topes separados para que `while (true) {}` termine.',
                ),
              },
              {
                title: s('Local model', 'Modelo local'),
                body: s(
                  'llama.cpp packed as a signed module, run by the same launcher as every other module, loading weights once and answering over a pipe — no daemon, no TCP, no network grant.',
                  'llama.cpp empaquetado como módulo firmado, corrido por el mismo lanzador que cualquier otro módulo, cargando los pesos una vez y respondiendo por un pipe — sin daemon, sin TCP, sin permiso de red.',
                ),
              },
            ],
          },
        ],
      },
      {
        kind: 'trust',
        blocks: [
          {
            list: [
              s(
                'The agent is outside the trusted computing base. It cannot execute directly, cannot compose the prompt the human authorises against, and cannot let untrusted text it has read decide what happens.',
                'El agente está fuera de la base de cómputo confiable. No puede ejecutar directamente, no puede redactar el aviso contra el que la persona autoriza y no puede dejar que texto no confiable que leyó decida qué ocurre.',
              ),
              s(
                'The authorisation frame is drawn by the core from the signed manifest; the core recomputes the artifact digest rather than believing the manifest.',
                'El aviso de autorización lo dibuja el núcleo a partir del manifiesto firmado; el núcleo recalcula el digest del artefacto en lugar de creerle al manifiesto.',
              ),
              s(
                'An external agent (via a host-side MCP adapter that holds no state) gets one workspace; every path is resolved twice — as the verb resolves it and as the kernel does — and both must land inside. Destructive verbs are unreachable, and what it changes is journalled as untrusted_content.',
                'Un agente externo (a través de un adaptador MCP del lado del host que no guarda estado) recibe un workspace; cada ruta se resuelve dos veces — como la resuelve el verbo y como la resuelve el kernel — y ambas tienen que caer dentro. Los verbos destructivos son inalcanzables, y lo que cambia queda en el journal como untrusted_content.',
              ),
              s(
                'An unsigned foreign binary is confined like a module, with no channel to Thalyx’s API and no unconfined mode.',
                'Un binario ajeno sin firmar se confina como un módulo, sin canal a la API de Thalyx y sin modo sin confinar.',
              ),
            ],
          },
          {
            figure: 'thalyx-authorisation',
            dark: true,
            zoom: 'md',
            alt: s(
              'A real Thalyx run: the core prints an authorisation frame listing the permission requested by a signed module.',
              'Una ejecución real de Thalyx: el núcleo imprime un aviso de autorización con el permiso que pide un módulo firmado.',
            ),
            caption: s('Real capture. The frame is composed by the core, never by the requester.', 'Captura real. El aviso lo compone el núcleo, nunca quien lo pide.'),
          },
        ],
      },
      {
        kind: 'invariants',
        blocks: [
          {
            list: [
              s('Everything the agent can do, a human can do directly, without losing capability.', 'Todo lo que el agente puede hacer, una persona puede hacerlo directamente, sin perder capacidad.'),
              s('A check that could not run is reported NOT PROVEN with its reason — never counted as a pass.', 'Una comprobación que no pudo correr se reporta NOT PROVEN con su motivo — nunca se cuenta como aprobada.'),
              s('An install commits atomically or not at all.', 'Una instalación se confirma de forma atómica o no ocurre.'),
              s('`make -C image count` prints 1: the image is the kernel and one program.', '`make -C image count` imprime 1: la imagen es el kernel y un programa.'),
              s('No destructive operation assumes Thalyx has complete knowledge of its own filesystem, because the human may change it behind its back.', 'Ninguna operación destructiva supone que Thalyx conoce por completo su propio sistema de archivos, porque la persona puede cambiarlo a sus espaldas.'),
            ],
          },
        ],
      },
      {
        kind: 'evidence',
        blocks: [
          {
            table: {
              head: [s('When', 'Cuándo'), s('What was shown', 'Qué se demostró')],
              rows: [
                [
                  '2026-08-07',
                  s(
                    'A PC booted Thalyx from USB through its own firmware, used HDMI and a real xHCI keyboard, installed itself onto a second disk and booted again without the medium. Phase 1 closed.',
                    'Una PC arrancó Thalyx desde USB con su propio firmware, usó HDMI y un teclado xHCI real, se instaló en un segundo disco y volvió a arrancar sin el medio. Fase 1 cerrada.',
                  ),
                ],
                [
                  '2026-08-25',
                  s(
                    '`sudo ./dev/verify.sh` on that machine: 156 proven, 2 not proven, 0 failed.',
                    '`sudo ./dev/verify.sh` en esa máquina: 156 probados, 2 no probados, 0 fallidos.',
                  ),
                ],
                [
                  s('Kernel side', 'Lado del kernel'),
                  s(
                    'The LSM denied a real network connection to the process lacking the permission, and only to it; Thalyx attached its own LSM with no bpftool; the kernel mounted a Btrfs filesystem Thalyx wrote byte by byte; the mutation ring buffer was mapped and drained from a real kernel pin.',
                    'El LSM negó una conexión de red real al proceso sin el permiso, y solo a ese; Thalyx adjuntó su propio LSM sin bpftool; el kernel montó un sistema Btrfs que Thalyx escribió byte por byte; el ring buffer de mutaciones se mapeó y vació desde un pin real del kernel.',
                  ),
                ],
              ],
            },
          },
          {
            figure: 'thalyx-atomic',
            dark: true,
            zoom: 'md',
            alt: s(
              'A real capture: the module install is killed with SIGABRT between the directory rename and the symlink swap; nothing is half-installed and the retry succeeds.',
              'Una captura real: la instalación se mata con SIGABRT entre el rename del directorio y el cambio del symlink; nada queda a medias y el reintento funciona.',
            ),
            caption: s(
              'Fault injection (`THALYX_FAULT_POINT=mid-commit`): killed at the most dangerous instant, the store reports one unresolved intent and one inert orphan, and the retry succeeds.',
              'Inyección de fallos (`THALYX_FAULT_POINT=mid-commit`): matada en el instante más peligroso, el almacén reporta una intención sin resolver y un huérfano inerte, y el reintento funciona.',
            ),
          },
        ],
      },
      {
        kind: 'experiments',
        blocks: [
          {
            items: [
              {
                title: s('External agent vs. POSIX tools', 'Agente externo contra herramientas POSIX'),
                body: s(
                  'Asked where a symbol is defined and what depends on it, the agent answered in four calls through Thalyx’s index without opening a file; the same model with Read and grep took eight turns and twice the wall time. That is one run of one task — an anecdote, not a result. The harness (dev/bench-external-agent.sh) now measures both arms in the same units.',
                  'Al preguntarle dónde se define un símbolo y qué depende de él, el agente respondió en cuatro llamadas a través del índice de Thalyx sin abrir un archivo; el mismo modelo con Read y grep tardó ocho turnos y el doble de tiempo. Es una corrida de una tarea — una anécdota, no un resultado. El harness (dev/bench-external-agent.sh) ahora mide los dos brazos en las mismas unidades.',
                ),
              },
              {
                title: s('The dependency index', 'El índice de dependencias'),
                body: s(
                  'That same run found a dependent the index missed (reached through a field, never named by import). The edge definition was widened, and a corpus of twelve small trees with written answers now runs 44 exact checks.',
                  'Esa misma corrida encontró un dependiente que el índice no veía (alcanzado por un campo, nunca nombrado en un import). Se amplió la definición de arista, y un corpus de doce árboles pequeños con sus respuestas escritas corre ahora 44 comprobaciones exactas.',
                ),
              },
            ],
          },
        ],
      },
      {
        kind: 'failures',
        blocks: [
          {
            items: [
              {
                title: s('The remedy that disabled enforcement', 'El remedio que desactivaba la aplicación'),
                body: s(
                  'The first foreign-binary run on hardware correctly refused because the policy map was not loaded — but the remedy it suggested loaded the LSM in observe mode, where denials are logged and not applied. Nothing had ever read the map that says whether a denial is real. Now a guest is refused there too, and `thalyx enforce status` names the mode.',
                  'La primera corrida de un binario ajeno en hardware se negó correctamente porque el mapa de política no estaba cargado — pero el remedio que sugería cargaba el LSM en modo observación, donde las negaciones se registran y no se aplican. Nadie había leído nunca el mapa que dice si una negación es real. Ahora un invitado también se rechaza ahí, y `thalyx enforce status` dice en qué modo está.',
                ),
              },
              {
                title: s('A count that moved', 'Una cuenta que se movió'),
                body: s(
                  'A previous run reported 134 on a machine with no kernel built, where thirteen QEMU checks collapsed into a single NOT PROVEN line. Since then a marker and the lines under it are treated as one result.',
                  'Una corrida anterior reportó 134 en una máquina sin kernel compilado, donde trece comprobaciones de QEMU se colapsaron en una sola línea NOT PROVEN. Desde entonces un marcador y las líneas debajo se tratan como un solo resultado.',
                ),
              },
              {
                title: s('The largest model tier', 'El nivel de modelo más grande'),
                body: s(
                  'Killed for running out of memory before its first inference finished. Recorded as no measurement, not as a score of zero.',
                  'Lo mató la falta de memoria antes de terminar su primera inferencia. Se registró como sin medición, no como una puntuación de cero.',
                ),
              },
            ],
          },
        ],
      },
      {
        kind: 'notProven',
        blocks: [
          {
            list: [
              s('Model abstention: across the three measured tiers, every ambiguous utterance produced a module id instead of a clarification request. The grammar constrains the shape of an answer, never its truth.', 'Abstención del modelo: en los tres niveles medidos, cada enunciado ambiguo produjo un id de módulo en lugar de una petición de aclaración. La gramática restringe la forma de una respuesta, nunca su verdad.'),
              s('Whether the agent-facing surface makes a frontier agent do more correct work with less effort: not measured.', 'Si la superficie para agentes hace que un agente de frontera haga más trabajo correcto con menos esfuerzo: no medido.'),
              s('thalyx_watch (the filesystem watcher) has never been loaded by Thalyx’s own loader; bpftool still loads it.', 'thalyx_watch (el vigilante del sistema de archivos) nunca ha sido cargado por el loader propio de Thalyx; lo sigue cargando bpftool.'),
              s('No internal disk and no NVMe device has received an installation.', 'Ningún disco interno ni dispositivo NVMe ha recibido una instalación.'),
              s('The framebuffer screen has not been shown by any hardware yet; virtio-serial has not carried a byte (everything above it ran over a UNIX socket).', 'Ninguna máquina ha mostrado todavía la pantalla en framebuffer; virtio-serial no ha llevado un solo byte (todo lo de encima corrió sobre un socket UNIX).'),
              s('What a confined foreign binary can see needs a machine with the LSM attached, and is NOT PROVEN until the next run there.', 'Lo que un binario ajeno confinado puede ver necesita una máquina con el LSM adjunto, y está NOT PROVEN hasta la siguiente corrida ahí.'),
            ],
          },
        ],
      },
      {
        kind: 'limitations',
        blocks: [
          {
            p: s(
              'A published contradiction: the founding decree says modules speak to Thalyx only through its API, but today a module is a dynamically linked Linux binary — the sandbox mounts /usr, /lib, /bin and /etc read-only and the seccomp filter permits around 120 syscalls. What holds is narrower: the Thalyx API is the only mediated surface, not the only reachable one.',
              'Una contradicción publicada: el decreto fundacional dice que los módulos solo le hablan a Thalyx por su API, pero hoy un módulo es un binario Linux enlazado dinámicamente — el sandbox monta /usr, /lib, /bin y /etc en solo lectura y el filtro seccomp permite alrededor de 120 syscalls. Lo que se sostiene es más estrecho: la API de Thalyx es la única superficie mediada, no la única alcanzable.',
            ),
          },
        ],
      },
      {
        kind: 'reproduce',
        blocks: [
          {
            code: 'make -C image doctor\nmake -C image\nmake -C image store-stage\nsudo make -C image store\nmake -C image run        # boots inside QEMU\n\ncargo test --workspace\nsudo ./dev/verify.sh     # PROVEN / NOT PROVEN / FAILED, on real hardware',
          },
        ],
      },
    ],
    sources: [
      { label: s('Repository', 'Repositorio'), href: `${GH}/thalyx` },
      { label: s('docs/STATUS.md', 'docs/STATUS.md'), href: `${GH}/thalyx/blob/main/docs/STATUS.md` },
      { label: s('docs/BOOT.md', 'docs/BOOT.md'), href: `${GH}/thalyx/blob/main/docs/BOOT.md` },
    ],
  },

  /* ================================================================ *
   * Thalyx-Kernel — full deep dive
   * ================================================================ */
  {
    slug: 'thalyx-kernel',
    depth: 'deep',
    abstract: s(
      'A from-scratch x86_64 capability microkernel for bounded, attributable delegated work: generational revocable capabilities, work-scopes, attributable IPC, ring-3 domains, SMP and a versioned durable-state service — gated phase by phase by independent checkers and compared against Linux.',
      'Un microkernel de capacidades x86_64 escrito desde cero para trabajo delegado acotado y atribuible: capacidades generacionales revocables, work-scopes, IPC atribuible, dominios en ring 3, SMP y un servicio de estado durable versionado — validado fase por fase por verificadores independientes y comparado contra Linux.',
    ),
    headline: [
      { value: 'K0–K6', label: s('complete in their stated scope', 'completas en su alcance declarado') },
      { value: '47/47', label: s('K5 gate · self-test 88/88', 'gate K5 · autoprueba 88/88') },
      { value: '17', label: s('paired native/Linux benchmarks', 'benchmarks pareados nativo/Linux') },
      { value: '8', label: s('bottlenecks found and fixed by measuring', 'cuellos de botella encontrados y corregidos midiendo') },
    ],
    caveat: s(
      'IPC scaling is still open: after the machine-wide lock was split, four pairs reach 8,518 round trips per 10 ms against 11,914 on Linux (71%) — the remaining cost is per-scope accounting along the ancestor chain.',
      'La escalabilidad de la IPC sigue abierta: tras partir el lock global, cuatro pares llegan a 8,518 idas y vueltas por 10 ms contra 11,914 en Linux (71 %) — el costo que queda es la contabilidad por scope a lo largo de la cadena de ancestros.',
    ),
    sections: [
      {
        kind: 'architecture',
        blocks: [
          {
            items: [
              {
                title: s('Capabilities, not ambient authority', 'Capacidades, no autoridad ambiental'),
                body: s('Every object — memory, IPC endpoint, device, log — is reached through a generational, revocable handle with its own rights mask. No global namespace.', 'Cada objeto — memoria, endpoint de IPC, dispositivo, log — se alcanza con un handle generacional y revocable con su propia máscara de derechos. Sin espacio de nombres global.'),
              },
              {
                title: s('Work-scopes', 'Work-scopes'),
                body: s('A scope bounds an operation’s authority, aggregate CPU budget and lifetime. Delegated authority dies when the scope is fenced and drained; work is cancelled by closing the scope, not by hunting a process tree.', 'Un scope acota la autoridad de una operación, su presupuesto agregado de CPU y su vida. La autoridad delegada muere cuando el scope se cierra y se drena; el trabajo se cancela cerrando el scope, no persiguiendo un árbol de procesos.'),
              },
              {
                title: s('Attributable IPC', 'IPC atribuible'),
                body: s('Every call carries its origin, causal parent and charge, and writes a control-log receipt, so work crossing client → server → engine keeps who pays and who is accountable.', 'Cada llamada lleva su origen, su padre causal y su cargo, y escribe un recibo en el log de control, así que el trabajo que cruza cliente → servidor → motor conserva quién paga y quién responde.'),
              },
              {
                title: s('Domains and hardware', 'Dominios y hardware'),
                body: s('Ring-3 domains in separate address spaces with timer preemption; SMP on 4 processors with cross-CPU TLB shootdown; a user-space virtio-blk driver; a UEFI loader; one ABI schema generating Rust bindings, a C header and byte-exact fixtures; a from-scratch libc.', 'Dominios en ring 3 con espacios de direcciones separados y preempción por timer; SMP en 4 procesadores con TLB shootdown entre CPUs; un driver virtio-blk en espacio de usuario; un loader UEFI; un solo esquema de ABI que genera bindings de Rust, un header de C y fixtures exactos al byte; una libc escrita desde cero.'),
              },
              {
                title: s('Versioned durable state', 'Estado durable versionado'),
                body: s('A user-space state service publishes immutable, versioned objects with compare-and-swap on a generation. Recovery is driven by what a crash left on the medium, never by a flag the writer set.', 'Un servicio de estado en espacio de usuario publica objetos inmutables y versionados con compare-and-swap sobre una generación. La recuperación se guía por lo que un crash dejó en el medio, nunca por una bandera que puso el escritor.'),
              },
              {
                title: s('Later phases', 'Fases posteriores'),
                body: s('K5 runs Thalyx’s real semantics on this kernel with real components: QuickJS, a native validation tool, and llama.cpp as a resident engine, under rivals, cancellation and crashes.', 'K5 corre la semántica real de Thalyx sobre este kernel con componentes reales: QuickJS, una herramienta nativa de validación y llama.cpp como motor residente, bajo rivales, cancelación y crashes.'),
              },
            ],
          },
        ],
      },
      {
        kind: 'invariants',
        blocks: [
          {
            list: [
              s('Authority is only ever reached through a capability.', 'La autoridad solo se alcanza a través de una capacidad.'),
              s('Publication is conditional on a generation; recovery reads the medium, not the writer’s intent.', 'La publicación es condicional a una generación; la recuperación lee el medio, no la intención del escritor.'),
              s('Each gate re-runs every prior gate’s criteria against the same kernel binary; K1–K6 are one binary with a different user-space package.', 'Cada gate vuelve a correr los criterios de todos los anteriores contra el mismo binario del kernel; K1–K6 son un solo binario con distinto paquete de espacio de usuario.'),
              s('A gate is a separate script reading kernel logs and decoded medium bytes — not the program’s opinion of itself.', 'Un gate es un script aparte que lee los logs del kernel y los bytes decodificados del medio — no la opinión del programa sobre sí mismo.'),
            ],
          },
        ],
      },
      {
        kind: 'evidence',
        blocks: [
          {
            table: {
              head: [s('Phase', 'Fase'), s('Demonstrated', 'Demostrado'), s('Gate', 'Gate')],
              rows: [
                ['K1', s('Protected boot: ring-3 domains, timer preemption, illegal accesses contained', 'Arranque protegido: dominios ring 3, preempción por timer, accesos ilegales contenidos'), '13/13'],
                ['K2', s('Capability system: 51/51 interface operations, delegation and revocation, attributable work', 'Sistema de capacidades: 51/51 operaciones de interfaz, delegación y revocación, trabajo atribuible'), '21/21 · 28/28'],
                ['K3', s('SMP (4 CPUs), TLB shootdown, user-space virtio-blk', 'SMP (4 CPUs), TLB shootdown, virtio-blk en espacio de usuario'), '28/28 · 57/57'],
                ['K4', s('Durable versioned state surviving a crash at every write point in the matrix', 'Estado durable versionado que sobrevive a un crash en cada punto de escritura de la matriz'), '31/31 · 48/48'],
                ['K5', s('Thalyx port: QuickJS, native validation tool, resident llama.cpp', 'Port de Thalyx: QuickJS, herramienta nativa de validación, llama.cpp residente'), '47/47 · 88/88'],
                ['K6', s('17 paired benchmarks vs. Linux, 8 bottlenecks fixed, KVM campaign', '17 benchmarks pareados contra Linux, 8 cuellos corregidos, campaña en KVM'), '19/19 + 5 · 27/27'],
              ],
            },
          },
        ],
      },
      {
        kind: 'measurements',
        title: s('Measurements — native vs. Linux, same KVM machine (medians)', 'Mediciones — nativo contra Linux, misma máquina KVM (medianas)'),
        blocks: [
          {
            p: s(
              'Every benchmark declares before measuring what it may conclude: equivalent (a real speed difference), comparable (same question, different guarantees — a cost, never a “faster”), or distinct (no speed conclusion).',
              'Cada benchmark declara antes de medir qué puede concluir: equivalente (una diferencia real de velocidad), comparable (misma pregunta, garantías distintas — un costo, nunca un «más rápido») o distinto (sin conclusión de velocidad).',
            ),
          },
          {
            table: {
              head: [s('Benchmark', 'Benchmark'), s('Native', 'Nativo'), s('Linux', 'Linux'), s('Reading', 'Lectura')],
              rows: [
                [s('IPC round trip', 'Ida y vuelta de IPC'), '2.7 µs', '6.5 µs', s('Comparable, not equivalent: native also stamps origin/scope/causal parent and writes a receipt', 'Comparable, no equivalente: el nativo además sella origen/scope/padre causal y escribe un recibo')],
                [s('Map / seal / derive', 'Mapear / sellar / derivar'), '0.46×–4.7×', '1×', s('Each difference attributed to a stated guarantee difference', 'Cada diferencia atribuida a una diferencia de garantías declarada')],
                [s('Compute scaling, 4 CPUs', 'Escalado de cómputo, 4 CPUs'), '3.95×', '4.0×', s('Same shape', 'Misma forma')],
                [s('IPC scaling, 4 pairs — reference campaign', 'Escalado de IPC, 4 pares — campaña de referencia'), '1,806', '11,912', s('Round trips / 10 ms. One machine-wide lock: IPC did not scale', 'Idas y vueltas / 10 ms. Un solo lock global: la IPC no escalaba')],
                [s('IPC scaling, 4 pairs — after the lock split', 'Escalado de IPC, 4 pares — tras partir el lock'), '8,518', '11,914', s('3 rounds, not the 43 the estimator asks for; 71% of Linux', '3 rondas, no las 43 que pide el estimador; 71 % de Linux')],
                [s('Engine inference', 'Inferencia del motor'), '1.8 ms', '1.63 ms', s('~10% slower; byte-identical output in every repetition', '~10 % más lento; salida idéntica byte a byte en cada repetición')],
              ],
            },
          },
        ],
      },
      {
        kind: 'limitations',
        blocks: [
          {
            items: [
              {
                title: s('IPC scalability', 'Escalabilidad de IPC'),
                body: s('The reference campaign found a single machine-wide lock serializing object-touching entries. It was then split into a per-CPU reader lock plus per-record locks; the first attempt measured worse (6,411 vs. 7,344 round trips with four pairs) until the atomic operations per round trip came down. Lock waiting is now 4% of machine time; the limit is scope accounting along the ancestor chain, and even with it neutralised in discarded probes four pairs reach 11,070 — still under Linux. Tracked as OQ-04.', 'La campaña de referencia encontró un único lock global serializando las entradas que tocan objetos. Después se partió en un lock de lectores por CPU más locks por registro; el primer intento midió peor (6,411 contra 7,344 idas y vueltas con cuatro pares) hasta que bajaron las operaciones atómicas por ida y vuelta. La espera por locks es hoy el 4 % del tiempo de máquina; el límite es la contabilidad por scope a lo largo de la cadena de ancestros, y aun neutralizándola en sondas desechadas cuatro pares llegan a 11,070 — todavía bajo Linux. Registrado como OQ-04.'),
              },
              {
                title: s('Physical hardware', 'Hardware físico'),
                body: s('Every result is QEMU (TCG for the canonical gates, KVM for K6). The kernel has never booted on physical hardware outside a VM.', 'Todo resultado es QEMU (TCG para los gates canónicos, KVM para K6). El kernel nunca ha arrancado en hardware físico fuera de una VM.'),
              },
              {
                title: s('DMA isolation', 'Aislamiento de DMA'),
                body: s('No IOMMU is programmed. The only DMA profile is declared WEAK_TRUSTED_DRIVER; the strong profile is refused outright. An untrusted DMA-capable driver is not contained.', 'No se programa ningún IOMMU. El único perfil de DMA se declara WEAK_TRUSTED_DRIVER; el perfil fuerte se rechaza directamente. Un driver no confiable con DMA no está contenido.'),
              },
              {
                title: s('Power loss', 'Pérdida de energía'),
                body: s('K4 proves the store survives the writer disappearing at any point QEMU can stop it. Real controller write caches and mains power loss are not measured and not claimed.', 'K4 prueba que el almacén sobrevive a que el escritor desaparezca en cualquier punto donde QEMU puede detenerlo. Las cachés de escritura de un controlador real y la pérdida de corriente no se midieron y no se afirman.'),
              },
              {
                title: s('Thalyx entire', 'Thalyx entero'),
                body: s('K5 runs Thalyx’s semantics with real components, not the Thalyx binary itself; no Rust compiler runs inside a domain.', 'K5 corre la semántica de Thalyx con componentes reales, no el binario de Thalyx; ningún compilador de Rust corre dentro de un dominio.'),
              },
            ],
          },
        ],
      },
      {
        kind: 'nonClaims',
        blocks: [
          {
            p: s(
              'It does not outperform Linux in general. Where the native number is lower, the benchmark states whether it is a like-for-like comparison or a different set of guarantees.',
              'No supera a Linux en general. Donde el número nativo es menor, el benchmark declara si es una comparación equivalente o un conjunto distinto de garantías.',
            ),
          },
        ],
      },
      {
        kind: 'reproduce',
        blocks: [
          {
            code: 'python3 tools/build_image.py --phase k1            # k1 .. k6\npython3 tools/run_gates.py --platform tcg          # K1 → K5, one platform\nTHALYX_ACCEL=kvm python3 tools/run_k6.py --label baseline --rounds 6 --arms native linux linux-nomitig\npython3 tools/check_k6.py                          # re-derives the verdicts, does not trust the campaign',
          },
        ],
      },
    ],
    sources: [
      { label: s('Repository', 'Repositorio'), href: `${GH}/thalyx-kernel` },
      { label: s('K6 evidence', 'Evidencia K6'), href: `${GH}/thalyx-kernel/blob/main/vault/evidence/k6-comparison-hardening.md` },
      { label: s('Open questions', 'Preguntas abiertas'), href: `${GH}/thalyx-kernel/blob/main/vault/roadmap/open-questions.md` },
    ],
  },

  /* ================================================================ *
   * SupaKernel — full deep dive
   * ================================================================ */
  {
    slug: 'supakernel',
    depth: 'deep',
    abstract: s(
      'A TypeScript backend runtime offering an explicit subset of Supabase Data/Auth/Storage/Realtime/Management over PostgreSQL, SQLite and PGlite through one runtime-independent semantic core — where every supported claim is a traceable chain from capability to hashed artifact.',
      'Un runtime de backend en TypeScript que ofrece un subconjunto explícito de Data/Auth/Storage/Realtime/Management de Supabase sobre PostgreSQL, SQLite y PGlite con un solo núcleo semántico independiente del runtime — donde cada afirmación soportada es una cadena trazable de la capacidad al artefacto con hash.',
    ),
    headline: [
      { value: '22', label: s('release gates', 'gates de release') },
      { value: '20', label: s('pass', 'pasan') },
      { value: '2', label: s('artifact-only', 'solo con artefacto') },
      { value: '0', label: s('failed · 0 blocked · releasable: true', 'fallidos · 0 bloqueados · releasable: true') },
    ],
    caveat: s(
      'No blanket Supabase parity, no “faster than BKND”, and no agent-DX result: each is explicitly withheld where the evidence is inconclusive or could not be produced.',
      'Nada de paridad total con Supabase, nada de «más rápido que BKND» y ningún resultado de DX con agentes: cada uno se retiene explícitamente donde la evidencia es inconclusa o no se pudo producir.',
    ),
    sections: [
      {
        kind: 'architecture',
        blocks: [
          {
            items: [
              {
                title: s('Portable semantic core', 'Núcleo semántico portable'),
                body: s('Canonical contracts and ports (DB, blob, runtime, crypto, clock, random, fault, mail, changefeed) are dependency-free; adapters plug in real PostgreSQL, SQLite and PGlite. Package boundaries are checked, not assumed.', 'Contratos canónicos y puertos (DB, blob, runtime, crypto, reloj, aleatorio, fallos, correo, changefeed) sin dependencias; los adaptadores conectan PostgreSQL, SQLite y PGlite reales. Las fronteras entre paquetes se comprueban, no se suponen.'),
              },
              {
                title: s('Surfaces', 'Superficies'),
                body: s('Data (PostgREST-compatible), Auth (GoTrue-compatible), Storage (FS/S3/R2/OPFS), Realtime changes, and Management over MCP.', 'Data (compatible con PostgREST), Auth (compatible con GoTrue), Storage (FS/S3/R2/OPFS), cambios en Realtime y Management por MCP.'),
              },
              {
                title: s('Authorization', 'Autorización'),
                body: s('RLS enforced PG-direct on PostgreSQL, and by query rewrite on SQLite, tested against an attack corpus.', 'RLS aplicada directamente en PostgreSQL, y por reescritura de consultas en SQLite, probada contra un corpus de ataques.'),
              },
              {
                title: s('Schema', 'Esquema'),
                body: s('SchemaIR from PG AST: normalize, diff, plan, apply, journal — migrations across every adapter, and an upgrade path from SupaKernel to Supabase local.', 'SchemaIR desde el AST de PG: normalizar, comparar, planear, aplicar, registrar — migraciones en todos los adaptadores y una ruta de actualización de SupaKernel a Supabase local.'),
              },
              {
                title: s('Runtime portability', 'Portabilidad de runtime'),
                body: s('Six real runtime profiles with receipts: Node 24 baseline, Bun, Deno, workerd (D1), and Chromium (WASM SQLite, OPFS).', 'Seis perfiles de runtime reales con recibo: Node 24 como base, Bun, Deno, workerd (D1) y Chromium (SQLite en WASM, OPFS).'),
              },
            ],
          },
        ],
      },
      {
        kind: 'invariants',
        title: s('The evidence model', 'El modelo de evidencia'),
        blocks: [
          {
            code: 'claim → capability → contract § → real targets → command → artifact → hash → result → limitation',
            caption: s('A claim not listed with this full tuple is experimental / unsupported.', 'Una afirmación que no aparece con esta tupla completa es experimental / no soportada.'),
          },
        ],
      },
      {
        kind: 'evidence',
        title: s('Evidence — selected gates', 'Evidencia — gates seleccionados'),
        blocks: [
          {
            table: {
              head: [s('Gate', 'Gate'), s('Real targets', 'Targets reales'), s('Command', 'Comando')],
              rows: [
                [s('PostgreSQL support', 'Soporte PostgreSQL'), 'PostgreSQL 18.6', 'pnpm test:db:postgres'],
                [s('SQLite support', 'Soporte SQLite'), 'node:sqlite · bun:sqlite · D1 workerd · WASM Chromium', 'pnpm test:db:sqlite-matrix'],
                [s('Realtime compatibility', 'Compatibilidad Realtime'), s('client 2.115 + 4 listener runtimes + Supabase local', 'cliente 2.115 + 4 runtimes de escucha + Supabase local'), 'pnpm conformance --capability realtime'],
                [s('Authorization', 'Autorización'), s('PG-direct RLS + SQLite rewrite', 'RLS directa en PG + reescritura en SQLite'), 'pnpm test:security:attacks'],
                [s('Properties', 'Propiedades'), s('6 models, PG/SQLite', '6 modelos, PG/SQLite'), 'pnpm property:pr'],
                [s('Semantic + generated mutation', 'Mutación semántica + generada'), s('critical mutants and changed packages', 'mutantes críticos y paquetes cambiados'), 'pnpm mutation:semantic · mutation:critical'],
                [s('Fault / recovery', 'Fallos / recuperación'), s('every named fault, hard restart', 'cada fallo nombrado, reinicio duro'), 'pnpm fault:all'],
                [s('Threat / redaction', 'Amenazas / redacción'), s('canary secrets + attack corpus', 'secretos canario + corpus de ataques'), 'pnpm security:audit'],
                [s('Observability / replay', 'Observabilidad / replay'), s('failure artifacts', 'artefactos de fallo'), 'pnpm artifacts:audit'],
                [s('Reference traces', 'Trazas de referencia'), s('four upstream gate chains', 'cuatro cadenas de gates upstream'), 'pnpm trace:audit'],
                [s('Upgrade', 'Actualización'), s('SupaKernel → Supabase local', 'SupaKernel → Supabase local'), 'pnpm test:upgrade:local'],
              ],
            },
          },
        ],
      },
      {
        kind: 'failures',
        title: s('Divergences found upstream', 'Divergencias encontradas upstream'),
        blocks: [
          {
            p: s(
              'A real, three-times-replayed divergence: supabase/storage returns HTTP 400 instead of 404 for a GET of a missing object. An evidence bundle is produced; submission and upstream acceptance require human review and are not claimed.',
              'Una divergencia real, repetida tres veces: supabase/storage devuelve HTTP 400 en lugar de 404 al hacer GET de un objeto inexistente. Se produce un paquete de evidencia; el envío y la aceptación upstream requieren revisión humana y no se afirman.',
            ),
          },
        ],
      },
      {
        kind: 'nonClaims',
        blocks: [
          {
            items: [
              {
                title: s('No blanket Supabase parity', 'Nada de paridad total con Supabase'),
                body: s('Only the listed subset is supported; everything else is experimental.', 'Solo el subconjunto listado está soportado; lo demás es experimental.'),
              },
              {
                title: s('No “faster than BKND”', 'Nada de «más rápido que BKND»'),
                body: s('The benchmark validator passes, but on a shared runner the verdict is inconclusive. A competitive claim needs a dedicated runner.', 'El validador del benchmark pasa, pero en un runner compartido el veredicto es inconcluso. Una afirmación competitiva necesita un runner dedicado.'),
              },
              {
                title: s('No agent-DX result', 'Ningún resultado de DX con agentes'),
                body: s('A fixed-model A/B comparison needs a provider credential the owner supplies. The harness is validated with a deterministic scripted agent; no DX claim is made.', 'Una comparación A/B con modelo fijo necesita una credencial de proveedor que aporta el dueño. El harness se validó con un agente guionado determinista; no se hace ninguna afirmación de DX.'),
              },
              {
                title: s('No fabricated upstream acceptance', 'Ninguna aceptación upstream inventada'),
                body: s('Evidence bundles exist; acceptance does not, and is not reported as if it did. Packages stay private pending a naming review.', 'Los paquetes de evidencia existen; la aceptación no, y no se reporta como si existiera. Los paquetes siguen privados en espera de una revisión de nombre.'),
              },
            ],
          },
        ],
      },
      {
        kind: 'reproduce',
        blocks: [
          {
            code: 'corepack pnpm install --frozen-lockfile\npnpm verify:provenance\npnpm check:boundaries\npnpm typecheck && pnpm lint && pnpm test\npnpm release:audit          # regenerates release/manifest.json and acceptance.json',
          },
        ],
      },
    ],
    sources: [
      { label: s('Repository', 'Repositorio'), href: `${GH}/supakernel` },
      { label: s('release/claims.md', 'release/claims.md'), href: `${GH}/supakernel/blob/main/release/claims.md` },
      { label: s('release/acceptance.json', 'release/acceptance.json'), href: `${GH}/supakernel/blob/main/release/acceptance.json` },
    ],
  },

  /* ================================================================ *
   * SupaDiff — full deep dive
   * ================================================================ */
  {
    slug: 'supadiff',
    depth: 'deep',
    abstract: s(
      'Compatibility is observable behavior. A deterministic, capability-aware runner that executes one scenario against Supalite and real Supabase targets, redacts and projects the observations, and classifies every difference into a closed taxonomy.',
      'La compatibilidad es comportamiento observable. Un runner determinista y consciente de capacidades que ejecuta un escenario contra Supalite y targets reales de Supabase, oculta y proyecta las observaciones y clasifica cada diferencia en una taxonomía cerrada.',
    ),
    headline: [
      { value: '2', label: s('real, reproducible cross-target bugs registered', 'bugs reales y reproducibles entre targets, registrados') },
      { value: 'L0–L14', label: s('architecture layers implemented', 'capas de la arquitectura implementadas') },
      { value: '4', label: s('target families: fake, Supalite, supabase-local, supabase-hosted', 'familias de targets: falso, Supalite, supabase-local, supabase-hosted') },
    ],
    caveat: s(
      'Realtime, Edge Functions and hosted `lite upgrade` transitions are outside what has been exercised; hosted ephemeral projects have no CI gate.',
      'Realtime, Edge Functions y las transiciones `lite upgrade` a hosted están fuera de lo ejercitado; los proyectos hosted efímeros no tienen gate de CI.',
    ),
    sections: [
      {
        kind: 'architecture',
        blocks: [
          {
            code: 'ScenarioSpec → validation → canonical ExecutionPlan\n  → deterministic execution  (fake · Supalite · supabase-local · supabase-hosted)\n  → raw observations → redaction → semantic observations\n  → semantic comparison → divergence classification\n  → deterministic artifact\n  → offline compare / inspect / replay / reduce / verify-upgrade',
          },
          {
            items: [
              {
                title: s('Real targets', 'Targets reales'),
                body: s('Exact-pinned @supabase/lite 0.9.0 across four backends; a full Supabase stack (Postgres, GoTrue, PostgREST, Storage, Kong) brought up by the pinned supabase CLI 2.116.0 over Docker; and an opt-in real hosted project via the Management API.', '@supabase/lite 0.9.0 fijado exacto en cuatro backends; un stack completo de Supabase (Postgres, GoTrue, PostgREST, Storage, Kong) levantado por el supabase CLI 2.116.0 fijado sobre Docker; y un proyecto hosted real, opcional, vía la Management API.'),
              },
              {
                title: s('Beyond comparison', 'Más allá de comparar'),
                body: s('A dogfood fault lab with replay; a state-aware reducer that shrinks a failing scenario; seeded scenario generation; and upgrade verification for the Supalite → Supabase-local transition.', 'Un laboratorio de fallos propio con replay; un reductor consciente del estado que encoge un escenario que falla; generación de escenarios con semilla; y verificación de la transición Supalite → Supabase-local.'),
              },
            ],
          },
        ],
      },
      {
        kind: 'invariants',
        blocks: [
          {
            list: [
              s('Outcomes are a closed set: match-exact, match-semantic, accepted-approximation, unsupported, known-divergence, new-divergence, inconclusive. There is no “expected difference” bucket.', 'Los resultados son un conjunto cerrado: match-exact, match-semantic, accepted-approximation, unsupported, known-divergence, new-divergence, inconclusive. No hay un cajón de «diferencia esperada».'),
              s('A registry entry only excuses a failure when its predicate evaluates true against the observed facts — never on error text alone.', 'Una entrada del registro solo excusa un fallo cuando su predicado da verdadero contra los hechos observados — nunca solo por el texto del error.'),
              s('More than one matching entry is inconclusive, never picked arbitrarily; an expired entry yields new-divergence plus a diagnostic.', 'Más de una entrada coincidente es inconcluso, nunca se elige al azar; una entrada vencida produce new-divergence más un diagnóstico.'),
              s('Wildcard version ranges and wildcard observable selectors are rejected.', 'Se rechazan rangos de versión comodín y selectores de observables comodín.'),
              s('Upgrade verification is dry-run by default; nothing is provisioned or mutated without --execute.', 'La verificación de actualización es simulada por defecto; nada se provisiona ni se muta sin --execute.'),
            ],
          },
        ],
      },
      {
        kind: 'evidence',
        title: s('Findings', 'Hallazgos'),
        blocks: [
          {
            items: [
              {
                title: s('signedUrl vs. signedURL', 'signedUrl contra signedURL'),
                body: s(
                  'Supalite’s storage sign endpoint returns the key signedUrl; Supabase Storage returns signedURL, which is what the official client reads. Through Supalite the client builds an undefined URL and the redeem returns HTTP 200 with Supalite’s admin HTML — a successful-looking response carrying the wrong bytes. Registered as two known-divergences on /bytesDigest and /contentLength.',
                  'El endpoint de firma de Supalite devuelve la llave signedUrl; Supabase Storage devuelve signedURL, que es la que lee el cliente oficial. A través de Supalite el cliente construye una URL indefinida y el canje devuelve HTTP 200 con el HTML de administración de Supalite — una respuesta que parece exitosa con los bytes equivocados. Registrado como dos known-divergences en /bytesDigest y /contentLength.',
                ),
              },
              {
                title: s('lite upgrade loses the serial sequence', 'lite upgrade pierde la secuencia serial'),
                body: s(
                  'Migrating a file-backed Supalite project to Supabase-local moves the rows correctly but leaves the destination’s serial sequence at its start value, so the first unqualified insert after upgrade collides on a duplicate key. Reported upstream as dswbx/lite-projects#69.',
                  'Migrar un proyecto de Supalite respaldado en archivo a Supabase-local mueve bien las filas pero deja la secuencia serial del destino en su valor inicial, así que el primer insert sin id después de actualizar choca con una llave duplicada. Reportado upstream como dswbx/lite-projects#69.',
                ),
              },
            ],
          },
          {
            p: s(
              'Upgrade verification also checks, on the real transition: source untouched, baseline retained, row IDs and Auth subject preserved, deliberate corruption detected, sessions not preserved (the actor re-authenticates as the same subject), and RLS behavior in lockstep before and after.',
              'La verificación de actualización también comprueba, sobre la transición real: origen intacto, línea base conservada, ids de filas y sujeto de Auth preservados, corrupción deliberada detectada, sesiones no preservadas (el actor se vuelve a autenticar como el mismo sujeto) y comportamiento de RLS idéntico antes y después.',
            ),
          },
        ],
      },
      {
        kind: 'limitations',
        blocks: [
          {
            list: [
              s('Storage preservation across upgrade is unsupported, and rejected before any mutation when required.', 'La preservación de Storage en la actualización no está soportada, y se rechaza antes de mutar nada cuando se exige.'),
              s('Hosted sign-up uses the GoTrue admin API plus password grant, not the public mailer flow (ADR 0003).', 'El registro en hosted usa la API de administración de GoTrue más password grant, no el flujo público por correo (ADR 0003).'),
              s('The hosted cleanup gate proves the owned-resource census returns to empty, not that the project is byte-for-byte identical to its initial image.', 'El gate de limpieza en hosted prueba que el censo de recursos propios vuelve a vacío, no que el proyecto sea idéntico byte a byte a su imagen inicial.'),
              s('Realtime, Edge Functions, a UI, generic fuzzing and a generic database reducer were never in scope.', 'Realtime, Edge Functions, una interfaz, fuzzing genérico y un reductor genérico de bases de datos nunca estuvieron en el alcance.'),
            ],
          },
        ],
      },
      {
        kind: 'reproduce',
        blocks: [
          {
            code: 'supadiff verify-upgrade                                   # dry-run, mutates nothing\nsupadiff verify-upgrade --supalite-version 0.10.0 --execute --output json\n\npnpm test:integration:supalite            # L6, no Docker\npnpm test:integration:peer-storage        # L11, needs Docker\npnpm release:evidence                     # L14',
          },
        ],
      },
    ],
    sources: [
      { label: s('Repository', 'Repositorio'), href: `${GH}/supadiff` },
      { label: s('docs/DIVERGENCES.md', 'docs/DIVERGENCES.md'), href: `${GH}/supadiff/blob/main/docs/DIVERGENCES.md` },
      { label: s('docs/LIMITATIONS.md', 'docs/LIMITATIONS.md'), href: `${GH}/supadiff/blob/main/docs/LIMITATIONS.md` },
    ],
  },

  /* ================================================================ *
   * Ferrol — full deep dive
   * ================================================================ */
  {
    slug: 'ferrol',
    depth: 'deep',
    abstract: s(
      'A modular monolith (Next.js, PostgreSQL, Drizzle) with a pure domain for pricing, catalogue and fiscal rules. Its engineering story is what happened when it met real supplier files, a real 12,000-product catalogue and Mexican tax law: assumptions that passed synthetic tests failed, and each failure became a rule and a regression test.',
      'Un monolito modular (Next.js, PostgreSQL, Drizzle) con un dominio puro para precios, catálogo y reglas fiscales. Su historia técnica es lo que pasó cuando se encontró con archivos reales de proveedores, un catálogo real de 12,000 productos y la ley fiscal mexicana: suposiciones que pasaban pruebas sintéticas fallaron, y cada fallo se volvió una regla y una prueba de regresión.',
    ),
    headline: [
      { value: '12,027', label: s('products in the first grouping run against the production database', 'productos en la primera corrida del agrupador contra la base de producción') },
      { value: '1,642', label: s('visual families', 'familias visuales') },
      { value: '1,800', label: s('image searches needed', 'búsquedas de imagen necesarias') },
      { value: '85%', label: s('searches saved', 'búsquedas ahorradas') },
    ],
    caveat: s(
      'Fiscal conformity against the official artifacts is not demonstrated: the machinery exists, but acquiring the official files was blocked by the environment’s network, and no PAC sandbox credentials exist.',
      'La conformidad fiscal contra los artefactos oficiales no está demostrada: la maquinaria existe, pero la obtención de los archivos oficiales quedó bloqueada por la red del entorno, y no hay credenciales de sandbox de ningún PAC.',
    ),
    sections: [
      {
        kind: 'architecture',
        blocks: [
          {
            p: s(
              'One deployable application serving the public catalogue, an authenticated admin panel and internal routes. Layers are interface → application → domain, with infrastructure implementing ports. The domain imports nothing from infrastructure or interface, enforced by an import-boundary lint rule. A port exists only when there are two real implementations (e.g. PostgreSQL full-text + trigram search and a deterministic in-memory search for tests).',
              'Una sola aplicación desplegable que sirve el catálogo público, un panel de administración autenticado y rutas internas. Las capas son interfaz → aplicación → dominio, con infraestructura implementando puertos. El dominio no importa nada de infraestructura ni de interfaz, y lo hace cumplir una regla de lint de límites de importación. Un puerto solo existe cuando hay dos implementaciones reales (p. ej. búsqueda de texto completo + trigramas en PostgreSQL y una búsqueda determinista en memoria para pruebas).',
            ),
          },
          {
            items: [
              {
                title: s('Money and prices', 'Dinero y precios'),
                body: s('Money is exact by contract. Prices derive from cost through per-list rules; trade accounts see their own lists, and private prices are isolated from the public cache.', 'El dinero es exacto por contrato. Los precios se derivan del costo con reglas por lista; las cuentas comerciales ven sus propias listas, y los precios privados están aislados de la caché pública.'),
              },
              {
                title: s('Requests before links', 'La solicitud antes que el enlace'),
                body: s('A customer request is written, with its folio, before the WhatsApp link exists; only the confirmation page composes the link.', 'La solicitud del cliente queda escrita, con su folio, antes de que exista el enlace de WhatsApp; solo la página de confirmación compone el enlace.'),
              },
            ],
          },
        ],
      },
      {
        kind: 'failures',
        title: s('What real data broke', 'Lo que rompieron los datos reales'),
        blocks: [
          {
            items: [
              {
                title: s('Valid OOXML rejected', 'OOXML válido rechazado'),
                body: s('A new supplier workbook used the x: namespace prefix (<x:sheet>, <x:row>, <x:c>). The reader only accepted unprefixed tags. It now accepts both.', 'Un libro nuevo de un proveedor usaba el prefijo de espacio de nombres x: (<x:sheet>, <x:row>, <x:c>). El lector solo aceptaba etiquetas sin prefijo. Ahora acepta ambas.'),
              },
              {
                title: s('A price read a thousand times too large', 'Un precio leído mil veces más grande'),
                body: s('A numeric cell like 99.735 has a text form indistinguishable from a typed “1,234”, so it could be read as 99735. The cell-to-text step now appends a trailing zero that keeps the value and removes the ambiguity; the thousands convention for typed text is unchanged.', 'Una celda numérica como 99.735 tiene una forma en texto indistinguible de un «1,234» tecleado, así que podía leerse como 99735. El paso de celda a texto ahora agrega un cero final que conserva el valor y quita la ambigüedad; la convención de millares para texto tecleado no cambió.'),
              },
              {
                title: s('A screw with a browser’s picture', 'Un tornillo con la foto de un navegador'),
                body: s('“TOR SOCKET C/CILINDRO NGO NC - 1/4-20 x 4” got a screenshot of “Download Tor Browser”: the supplier abbreviates TORNILLO as TOR, and the pipeline trusted the search engine’s first usable result. The ranking was correct; the question was ambiguous.', '«TOR SOCKET C/CILINDRO NGO NC - 1/4-20 x 4» recibió una captura de «Download Tor Browser»: el proveedor abrevia TORNILLO como TOR, y el pipeline confiaba en el primer resultado utilizable del buscador. El orden era correcto; la pregunta era ambigua.'),
              },
              {
                title: s('False context in queries', 'Contexto falso en las consultas'),
                body: s('Queries appended “ferreteria” when name and category were uninformative. The catalogue also carries automotive parts, so an oxygen sensor was being searched as hardware. Against real data the word did not narrow the universe — it changed it. It was removed; a query without an anchor now says so.', 'Las consultas agregaban «ferreteria» cuando el nombre y la categoría no decían nada. El catálogo también trae refacciones automotrices, así que un sensor de oxígeno se buscaba como ferretería. Con datos reales la palabra no acotaba el universo — lo cambiaba. Se quitó; una consulta sin ancla ahora lo dice.'),
              },
              {
                title: s('Qualifiers normalized away', 'Calificativos borrados al normalizar'),
                body: s('C/ expands to “con”, a stopword, so C/C vanished and two supplier articles — two keys, two prices — shared one photo inside a 367-product family. S/ (“sin”, a negation) was erased the same way. Unknown qualifiers are now kept and split the family.', 'C/ se expande a «con», palabra vacía, así que C/C desaparecía y dos artículos del proveedor — dos claves, dos precios — compartían una foto dentro de una familia de 367 productos. S/ («sin», una negación) se borraba igual. Los calificativos desconocidos ahora se conservan y separan la familia.'),
              },
              {
                title: s('The invoice XML never reached the customer', 'El XML de la factura nunca le llegaba al cliente'),
                body: s('The WhatsApp Cloud adapter uploaded the first attachment and silently dropped the rest. The end-to-end test checked that PDF and XML carried the same fiscal folio, not that both were sent. Now the PDF is attached and the XML goes through a signed, expiring HTTPS link; the adapter fails loudly with two attachments.', 'El adaptador de WhatsApp Cloud subía el primer adjunto y descartaba el resto en silencio. La prueba de punta a punta comprobaba que PDF y XML llevaran el mismo folio fiscal, no que los dos salieran. Ahora el PDF va adjunto y el XML por un enlace HTTPS firmado y con caducidad; el adaptador falla ruidosamente con dos adjuntos.'),
              },
              {
                title: s('A payment complement missing from the signed string', 'Un complemento de pago fuera de la cadena firmada'),
                body: s('Of nine fiscal defects found in one correctness pass, the worst: the payment complement was written into the XML but did not contribute to the cadena original, so every payment receipt was sealed over text that mentioned neither the payment nor the invoices it settled. The function existed, was tested in isolation, and nothing called it.', 'De nueve defectos fiscales encontrados en una pasada de corrección, el peor: el complemento de pagos se escribía en el XML pero no aportaba a la cadena original, así que todo comprobante de pago se sellaba sobre un texto que no mencionaba ni el pago ni las facturas que saldaba. La función existía, estaba probada en aislamiento, y nadie la llamaba.'),
              },
            ],
          },
        ],
      },
      {
        kind: 'architecture',
        title: s('Image pipeline, rebuilt from evidence', 'Pipeline de imágenes, rehecho a partir de la evidencia'),
        blocks: [
          {
            items: [
              {
                title: s('Vocabulary layer', 'Capa de vocabulario'),
                body: s('Expands supplier abbreviations, recognises measures (1/4-20, 5/16-18, M8 x 40) and guarantees the query names the part.', 'Expande las abreviaturas del proveedor, reconoce medidas (1/4-20, 5/16-18, M8 x 40) y garantiza que la consulta nombre la pieza.'),
              },
              {
                title: s('Evidence scoring', 'Puntuación por evidencia'),
                body: s('A result is kept by accumulated evidence, not rank: part name 3, attribute 1, measure 1, brand 2, key 4, an other-world word −4; threshold 3. “Download Tor Browser” scores −12. Below threshold, the product stays without a photo and the reason is recorded. No extra requests: only title, page URL and file name are read.', 'Un resultado se conserva por evidencia acumulada, no por posición: nombre de la pieza 3, atributo 1, medida 1, marca 2, clave 4, palabra de otro mundo −4; umbral 3. «Download Tor Browser» suma −12. Bajo el umbral, el producto se queda sin foto y se registra el motivo. Sin peticiones extra: solo se lee título, dirección de la página y nombre del archivo.'),
              },
              {
                title: s('Visual family as a unit of work', 'La familia visual como unidad de trabajo'),
                body: s('Coordinated in the database with two columns on the task table (family_key, available_at), no new table: if another worker holds the family the task is deferred; if the family has a photo the task arrives with it; if it was searched and had none, it closes without another search.', 'Se coordina en la base con dos columnas en la tabla de tareas (family_key, available_at), sin tabla nueva: si otro obrero tiene la familia la tarea se aplaza; si la familia ya tiene foto la tarea llega con ella; si ya se buscó y no había, se cierra sin otra búsqueda.'),
              },
              {
                title: s('Adaptive backoff; blocks are not “no image”', 'Backoff adaptativo; un bloqueo no es «sin imagen»'),
                body: s('One search engine with a shared adaptive clock: shared spacing, a penalty that doubles, relaxing after a streak, giving up after six blocks. A blocked request returns the task to the queue unspent — a 403 never becomes “this product has no photo”.', 'Un solo buscador con un reloj adaptativo compartido: espaciado común, castigo que se duplica, aflojar tras una racha, rendirse a los seis bloqueos. Una petición bloqueada devuelve la tarea a la cola sin gastarse — un 403 nunca se vuelve «este producto no tiene foto».'),
              },
              {
                title: s('One policy, two runtimes', 'Una política, dos runtimes'),
                body: s('The phone-side script receives query, family and rubric from the domain and only sums; a shared case file is tested on both sides to prove they reach the same verdict.', 'El script del teléfono recibe consulta, familia y rúbrica del dominio y solo suma; un archivo de casos compartido se prueba en los dos lados para demostrar que llegan al mismo veredicto.'),
              },
            ],
          },
        ],
      },
      {
        kind: 'measurements',
        blocks: [
          {
            table: {
              head: [s('Measurement', 'Medición'), s('Result', 'Resultado')],
              rows: [
                [s('First grouping run against the production database (no network)', 'Primera corrida del agrupador contra la base de producción (sin red)'), s('12,027 products → 1,642 families → 1,800 searches; 85% saved', '12,027 productos → 1,642 familias → 1,800 búsquedas; 85 % ahorrado')],
                [s('Effect of keeping C/C, on a sample built to exaggerate it (625 rows)', 'Efecto de conservar C/C, sobre una muestra construida para exagerarlo (625 renglones)'), s('21 → 24 families: +1 per variant, not per product', '21 → 24 familias: +1 por variante, no por producto')],
              ],
            },
          },
        ],
      },
      {
        kind: 'evidence',
        title: s('Fiscal correctness', 'Corrección fiscal'),
        blocks: [
          {
            list: [
              s('XSD validation with a real validator (xmllint, libxml2), deliberately kept off the emission path so a missing package cannot stop invoicing.', 'Validación XSD con un validador real (xmllint, libxml2), deliberadamente fuera del camino de emisión para que un paquete faltante no detenga la facturación.'),
              s('The cadena original is computed with the tax authority’s official XSLT, not a hand reimplementation. Without that artifact, Ferrol does not emit.', 'La cadena original se calcula con la XSLT oficial de la autoridad, no con una reimplementación a mano. Sin ese artefacto, Ferrol no emite.'),
              s('Official artifacts are installed with declared provenance, and their SHA-256 is checked on every use; the conformance run prints the hash of each artifact it used.', 'Los artefactos oficiales se instalan con procedencia declarada, y su SHA-256 se comprueba en cada uso; la corrida de conformidad imprime el hash de cada artefacto que usó.'),
              s('The seal is verified against the certificate embedded in the XML itself.', 'El sello se verifica contra el certificado que el propio XML lleva dentro.'),
              s('Metamorphic test: changing a payment’s amount, its date or the invoice total must change the cadena and the seal. With a stylesheet that ignores the complement installed on purpose, it does not — reproducing the old defect to prove the test would catch it.', 'Prueba metamórfica: cambiar el monto de un pago, su fecha o el total del comprobante tiene que cambiar la cadena y el sello. Con una hoja que ignora el complemento instalada a propósito, no cambia — reproduce el defecto anterior para demostrar que la prueba lo vería.'),
              s('DIOT (a positional file) is re-read field by field before delivery: in positional formats the real error is a shift, not a bad value.', 'La DIOT (un archivo posicional) se relee campo por campo antes de entregarse: en formatos posicionales el error real es un corrimiento, no un dato malo.'),
            ],
          },
        ],
      },
      {
        kind: 'notProven',
        blocks: [
          {
            list: [
              s('Conformance of XML and cadena against the official artifacts: the machinery is in place, the conformance is not demonstrated — the official files could not be downloaded in the development environment.', 'Conformidad del XML y la cadena contra los artefactos oficiales: la maquinaria está, la conformidad no está demostrada — los archivos oficiales no se pudieron descargar en el entorno de desarrollo.'),
              s('No PAC (certified provider) sandbox has been used, and no SOAP adapter was written against a contract nobody could read.', 'No se ha usado el sandbox de ningún PAC, y no se escribió ningún adaptador SOAP contra un contrato que nadie pudo leer.'),
              s('The rebuilt image search had not yet run its sample against the real catalogue when it was documented; the grouping numbers above measure the grouper, not photo quality.', 'La búsqueda de imágenes rehecha todavía no había corrido su muestra contra el catálogo real cuando se documentó; los números del agrupador miden el agrupador, no la calidad de las fotos.'),
              s('The last acceptance criterion of the production stage — domain and VPS — depends on external infrastructure.', 'El último criterio de aceptación de la etapa de producción — dominio y VPS — depende de infraestructura externa.'),
            ],
          },
        ],
      },
    ],
    sources: [],
  },

  /* ================================================================ *
   * Orux — technical breakdown
   * ================================================================ */
  {
    slug: 'orux',
    depth: 'breakdown',
    abstract: s(
      'A realtime coordination layer over real Git repositories: ownership reinterprets edits as proposals, and saving triggers a semantic impact analysis that degrades explicitly across LSP, AST, tree-sitter and regex tiers.',
      'Una capa de coordinación en tiempo real sobre repositorios Git reales: el ownership reinterpreta las ediciones como propuestas, y al guardar se dispara un análisis de impacto semántico que se degrada explícitamente entre niveles LSP, AST, tree-sitter y regex.',
    ),
    headline: [
      { value: '500+', label: s('automated tests', 'pruebas automatizadas') },
      { value: '4', label: s('analysis tiers, deepest available per file', 'niveles de análisis, el más profundo disponible por archivo') },
    ],
    caveat: s(
      'The hosted product was shut down; the repository is an engineering record that runs locally, not a live service.',
      'El producto hospedado se apagó; el repositorio es un registro de ingeniería que corre en local, no un servicio en vivo.',
    ),
    sections: [
      {
        kind: 'architecture',
        blocks: [
          {
            figure: 'orux-flow',
            zoom: 'lg',
            alt: s(
              'Diagram: an edit to an owned file applies live, otherwise it stays local as a tentative change; Ctrl+S runs the impact analysis; the owner gets a diff to approve, and affected owners get an impact notice.',
              'Diagrama: una edición a un archivo propio se aplica en vivo; si no, se queda local como cambio tentativo; Ctrl+S corre el análisis de impacto; el dueño recibe un diff para aprobar y los dueños afectados un aviso de impacto.',
            ),
            caption: s('How a change moves: ownership decides what an edit means; Ctrl+S is the checkpoint.', 'Cómo se mueve un cambio: el ownership decide qué significa una edición; Ctrl+S es el punto de control.'),
          },
          {
            table: {
              head: [s('Tier', 'Nivel'), s('Engine', 'Motor'), s('Job', 'Trabajo')],
              rows: [
                ['0', 'LSP — pyright, typescript-language-server, gopls, rust-analyzer', s('Fan-out: who really references the symbol', 'Fan-out: quién referencia realmente el símbolo')],
                ['1', s('Python’s own ast', 'El ast propio de Python'), s('Detection: isolate signature and public surface', 'Detección: aislar firma y superficie pública')],
                ['2', 'tree-sitter (JS/TS, Go, Rust)', s('Detection without a stdlib parser', 'Detección sin parser en la stdlib')],
                ['3', 'regex', s('The floor: no file goes unanalysed', 'El piso: ningún archivo queda sin analizar')],
              ],
            },
          },
          {
            p: s(
              'Multi-team runtime: a TeamRuntime owns everything alive for one team — workspace, presence, ownership, proposals, LSP sessions, locks — and nothing crosses teams. The backend is strictly hexagonal (domain, application, ports, inbound/outbound adapters) with one composition root. Underneath, each workspace is a real Git repo; credentials are ephemeral.',
              'Runtime multiequipo: un TeamRuntime es dueño de todo lo vivo de un equipo — workspace, presencia, ownership, propuestas, sesiones LSP, locks — y nada cruza entre equipos. El backend es hexagonal estricto (dominio, aplicación, puertos, adaptadores de entrada/salida) con una sola raíz de composición. Debajo, cada workspace es un repo Git real; las credenciales son efímeras.',
            ),
          },
        ],
      },
      {
        kind: 'failures',
        title: s('Learned the hard way', 'Aprendido a golpes'),
        blocks: [
          {
            p: s(
              'pyright’s documentSymbol does not fill in a signature, so an LSP can say who is affected but not what changed. Detection and fan-out were split into different tiers, and the client is told which tier answered — a component that degrades silently is invisible in production.',
              'El documentSymbol de pyright no llena la firma, así que un LSP puede decir a quién afecta pero no qué cambió. Detección y fan-out se separaron en niveles distintos, y al cliente se le dice qué nivel respondió — un componente que se degrada en silencio es invisible en producción.',
            ),
          },
        ],
      },
      {
        kind: 'limitations',
        blocks: [
          {
            list: [
              s('No conflict resolution by design: the thesis is preventing the collision; CRDTs were considered and rejected.', 'Sin resolución de conflictos por diseño: la tesis es evitar la colisión; los CRDT se consideraron y descartaron.'),
              s('No offline mode: shared live state is the foundation.', 'Sin modo offline: el estado compartido en vivo es el cimiento.'),
              s('A few tests assert degraded behaviour in a sandbox without tree-sitter grammars or language servers, so they fail where the full toolchain is installed.', 'Algunas pruebas afirman el comportamiento degradado en un sandbox sin gramáticas de tree-sitter ni servidores de lenguaje, así que fallan donde está instalada la cadena completa.'),
            ],
          },
        ],
      },
      {
        kind: 'reproduce',
        blocks: [{ code: 'cd backend && pip install -e ".[dev]" && python -m orux.server   # ws://localhost:8765\ncd frontend/ide && npm install && npm run dev                    # http://localhost:5173/app/\ncd backend && pytest' }],
      },
    ],
    sources: [{ label: s('Repository', 'Repositorio'), href: `${GH}/orux` }],
  },

  /* ================================================================ *
   * Índice Cero — technical breakdown
   * ================================================================ */
  {
    slug: 'indice-cero',
    depth: 'breakdown',
    abstract: s(
      'A multi-language learn-to-code platform where the course is the source of truth for language, compiler, editor, diagnostics and metrics; student code is executed remotely through a swappable executor and graded against visible and hidden test cases.',
      'Una plataforma multilenguaje para aprender a programar donde el curso es la fuente de verdad del lenguaje, el compilador, el editor, los diagnósticos y las métricas; el código del estudiante se ejecuta de forma remota con un executor intercambiable y se califica contra casos de prueba visibles y ocultos.',
    ),
    headline: [
      { value: '4', label: s('courses', 'cursos') },
      { value: '276', label: s('lessons in 56 units', 'lecciones en 56 unidades') },
      { value: '1,187', label: s('lesson steps', 'pasos de lección') },
      { value: '227', label: s('practice exercises', 'prácticas') },
    ],
    caveat: s(
      'Execution depends on an external executor service (public Wandbox by default); grading is only as available as that provider.',
      'La ejecución depende de un servicio executor externo (Wandbox público por defecto); la calificación solo está tan disponible como ese proveedor.',
    ),
    sections: [
      {
        kind: 'architecture',
        blocks: [
          {
            table: {
              head: [s('Course', 'Curso'), s('Language / executor', 'Lenguaje / executor'), s('Content', 'Contenido')],
              rows: [
                [s('C++ from zero', 'C++ desde cero'), 'C++ · cpp17-wandbox', s('10 units · 67 lessons · 80 practices', '10 unidades · 67 lecciones · 80 prácticas')],
                [s('Object-oriented programming', 'Programación orientada a objetos'), 'C# · csharp-mono-6.12', s('16 units (14 published) · 73 lessons · 64 practices', '16 unidades (14 publicadas) · 73 lecciones · 64 prácticas')],
                [s('Software development models and methods', 'Modelos y métodos de desarrollo de software'), 'C# · csharp-mono-6.12', s('10 units · 44 lessons · 32 practices', '10 unidades · 44 lecciones · 32 prácticas')],
                [s('Databases', 'Bases de datos'), 'SQL · sql-sqlite3-wandbox', s('20 units · 92 lessons · 51 practices', '20 unidades · 92 lecciones · 51 prácticas')],
              ],
            },
          },
          {
            items: [
              {
                title: s('The course is the source of truth', 'El curso es la fuente de verdad'),
                body: s('Editor mode, highlighting, diagnostics, the compiler used for grading and metric grouping all come from the course definition — never from what the client sends.', 'El modo del editor, el resaltado, los diagnósticos, el compilador con el que se califica y el agrupamiento de métricas salen de la definición del curso — nunca de lo que mande el cliente.'),
              },
              {
                title: s('Executor abstraction', 'Abstracción del executor'),
                body: s('getCodeExecutor() selects Wandbox (default), Piston or Judge0, public or self-hosted, from configuration. Changing provider is an environment variable, not a refactor.', 'getCodeExecutor() elige Wandbox (por defecto), Piston o Judge0, públicos o propios, desde la configuración. Cambiar de proveedor es una variable de entorno, no un refactor.'),
              },
              {
                title: s('Typed content', 'Contenido tipado'),
                body: s('Lessons live in typed TypeScript, not a CMS: errors surface at compile time. The seed upserts, so reloading a course never erases anyone’s progress.', 'Las lecciones viven en TypeScript tipado, no en un CMS: los errores salen en compilación. El seed hace upsert, así que recargar un curso nunca borra el progreso de nadie.'),
              },
              {
                title: s('One path for progress', 'Una sola vía para el progreso'),
                body: s('completeStep and submitExercise are Server Actions and the only places XP, streaks and lesson completion change.', 'completeStep y submitExercise son Server Actions y los únicos lugares donde cambian el XP, la racha y la lección completada.'),
              },
            ],
          },
        ],
      },
      {
        kind: 'evidence',
        blocks: [
          {
            figure: 'indice-lesson',
            zoom: 'lg',
            alt: s(
              'A lesson step from Unit 3: the explanation of int, double and char, an editor with the example, and the console showing the program’s real output.',
              'Un paso de la Unidad 3: la explicación de int, double y char, un editor con el ejemplo y la consola con la salida real del programa.',
            ),
            caption: s('The console is the program’s actual output after compiling and running, not a transcript.', 'La consola es la salida real del programa tras compilarlo y ejecutarlo, no una transcripción.'),
          },
          {
            p: s(
              'A challenge is not self-graded: it is compiled and run against input/output cases, including hidden ones, and the result decides whether the lesson is completed. Feedback aligns expected against actual output and reports the first diverging line and column.',
              'Un reto no se autoevalúa: se compila y se ejecuta contra casos de entrada/salida, incluidos ocultos, y el resultado decide si la lección se completa. La retroalimentación alinea la salida esperada con la obtenida y reporta la primera línea y columna donde divergen.',
            ),
          },
        ],
      },
      {
        kind: 'reproduce',
        blocks: [{ code: 'npm install\nnpm run db:push && npm run db:seed    # 4 courses, 56 units\nnpm run lint && npm run typecheck && npm test' }],
      },
    ],
    sources: [{ label: s('Repository', 'Repositorio'), href: `${GH}/cpp-ceti` }],
  },

  /* ================================================================ *
   * Studymation — technical breakdown
   * ================================================================ */
  {
    slug: 'studymation',
    depth: 'breakdown',
    abstract: s(
      'A document-generation pipeline where the assignment and rubric become an executable contract: steps are selected by a generation profile, citations are discovered, ranked and revalidated or explicitly marked missing, and the finished .docx is audited against the contract and a quality gate.',
      'Un pipeline de generación de documentos donde la consigna y la rúbrica se vuelven un contrato ejecutable: los pasos se eligen con un perfil de generación, las citas se descubren, se ordenan y se revalidan o se marcan explícitamente como faltantes, y el .docx terminado se audita contra el contrato y un quality gate.',
    ),
    headline: [
      { value: '3', label: s('citation sources: Semantic Scholar, Crossref, Brave', 'fuentes de citas: Semantic Scholar, Crossref, Brave') },
      { value: 'found=false', label: s('recorded, with reasons, when no source survives', 'registrado, con motivos, cuando no sobrevive ninguna fuente') },
    ],
    caveat: s(
      'The published document capture uses fixture prose: the environment that produced it had no model keys.',
      'La captura publicada del documento usa prosa de fixture: el entorno que la produjo no tenía llaves de modelo.',
    ),
    sections: [
      {
        kind: 'architecture',
        blocks: [
          {
            code: 'structure → content → contract validation → citations → assembly → quality gate',
          },
          {
            items: [
              {
                title: s('Dynamic pipeline', 'Pipeline dinámico'),
                body: s('A GenerationProfile derived from the document type decides whether a thesis plan, introduction, conclusion, overlap check or citations run at all. Content is planned globally, sections are written in parallel, then introduction and conclusion are written from what the sections actually say; a Jaccard overlap check rewrites duplicated sections.', 'Un GenerationProfile derivado del tipo de documento decide si corren siquiera el plan de tesis, la introducción, la conclusión, la revisión de traslape o las citas. El contenido se planea de forma global, las secciones se escriben en paralelo y luego la introducción y la conclusión se escriben a partir de lo que de verdad dicen las secciones; una revisión de traslape Jaccard reescribe secciones duplicadas.'),
              },
              {
                title: s('Citations', 'Citas'),
                body: s('Candidates are deduplicated, scored against the section they would support, and revalidated even from cache. A resolving DOI is one signal; relevance decides. The audit is stored per document and exposed through the API.', 'Los candidatos se deduplican, se puntúan contra la sección que apoyarían y se revalidan incluso desde caché. Un DOI que resuelve es una señal; decide la relevancia. La auditoría se guarda por documento y se expone por la API.'),
              },
              {
                title: s('Contract and quality gate', 'Contrato y quality gate'),
                body: s('ContractValidationStep re-reads the content against the rubric’s deliverables and logs auditable warnings. The terminal gate scans the rendered .docx for raw Mermaid, unresolved placeholders, stray markdown or charts without provenance; it reports and never blocks delivery.', 'ContractValidationStep vuelve a leer el contenido contra los entregables de la rúbrica y registra advertencias auditables. El gate final revisa el .docx renderizado buscando Mermaid crudo, marcadores sin resolver, markdown suelto o gráficas sin procedencia; reporta y nunca bloquea la entrega.'),
              },
              {
                title: s('SaaS infrastructure', 'Infraestructura SaaS'),
                body: s('FastAPI + PostgreSQL (SQLAlchemy 2, Alembic), Redis rate limiting, JWT in HttpOnly cookies, plans with per-plan models, credits on an immutable ledger with SELECT FOR UPDATE and idempotent references, Stripe with signed webhooks, S3-compatible storage with expiry. The LLM layer is provider-agnostic, resolved per plan and per task.', 'FastAPI + PostgreSQL (SQLAlchemy 2, Alembic), rate limiting con Redis, JWT en cookies HttpOnly, planes con modelos por plan, créditos en un libro inmutable con SELECT FOR UPDATE y referencias idempotentes, Stripe con webhooks firmados, almacenamiento compatible con S3 con caducidad. La capa de LLM es agnóstica al proveedor, resuelta por plan y por tarea.'),
              },
            ],
          },
          {
            figure: 'studymation-run',
            zoom: 'md',
            alt: s('The generation screen showing the backend’s real step: analysis and structure done, content in progress.', 'La pantalla de generación mostrando el paso real del backend: análisis y estructura hechos, contenido en curso.'),
            caption: s('Progress polls the document’s real current_step — not an animation.', 'El progreso consulta el current_step real del documento — no es una animación.'),
          },
        ],
      },
      {
        kind: 'reproduce',
        blocks: [{ code: 'make up-detached && make migrate\nmake test     # pytest, excluding tests that call external APIs\nmake check    # ruff + mypy' }],
      },
    ],
    sources: [{ label: s('Repository', 'Repositorio'), href: `${GH}/Studymation` }],
  },

  /* ================================================================ *
   * Ennard — technical breakdown
   * ================================================================ */
  {
    slug: 'ennard',
    depth: 'breakdown',
    abstract: s(
      'A server-plus-clients assistant: the agent lives in a persistent systemd service, the terminal is one client with the same protocol and token type a phone would use, and a per-tool, per-device policy separates automatic reads from approved mutations.',
      'Un asistente de servidor más clientes: el agente vive en un servicio persistente de systemd, la terminal es un cliente con el mismo protocolo y tipo de token que usaría un teléfono, y una política por herramienta y por dispositivo separa las lecturas automáticas de las mutaciones aprobadas.',
    ),
    headline: [
      { value: '22', label: s('tools: 15 automatic, 7 require approval', 'herramientas: 15 automáticas, 7 requieren aprobación') },
      { value: '181', label: s('tests, plus real execution on Linux', 'pruebas, más ejecución real en Linux') },
      { value: '1 / 10 min', label: s('paid-model call budget for proactive notices', 'presupuesto de llamadas al modelo de pago para avisos proactivos') },
    ],
    caveat: s(
      'It is reactive except for one narrow behaviour — failed-command notices — and the first real run showed the local 3B model letting typos through; that was then corrected.',
      'Es reactivo salvo por un comportamiento acotado — avisos de comandos fallidos — y la primera corrida real mostró al modelo local de 3B dejando pasar typos; eso se corrigió después.',
    ),
    sections: [
      {
        kind: 'architecture',
        blocks: [
          {
            items: [
              {
                title: s('Server and clients', 'Servidor y clientes'),
                body: s('The server and a local llama-server model run as persistent user systemd services; conversations survive closing the terminal and rebooting. A shell hook records each command and its exit code, and the output of the last failure, so “why did that fail?” needs no pasting.', 'El servidor y un modelo local con llama-server corren como servicios persistentes de systemd de usuario; las conversaciones sobreviven a cerrar la terminal y reiniciar. Un gancho de la shell registra cada comando con su código de salida, y la salida del último fallo, así que «¿por qué falló eso?» no necesita pegar nada.'),
              },
              {
                title: s('Typed long-term memory', 'Memoria a largo plazo tipada'),
                body: s('Entries are typed as fact, preference, inference, retrieved or open question, so an inference that might be wrong is never presented as something the user said.', 'Las entradas se tipan como hecho, preferencia, inferencia, recuperado o pregunta abierta, así que una inferencia que puede estar mal nunca se presenta como algo que dijo el usuario.'),
              },
            ],
          },
        ],
      },
      {
        kind: 'trust',
        blocks: [
          {
            list: [
              s('Read tools (files, search, git status/log/diff, processes, system status) run without approval.', 'Las herramientas de lectura (archivos, búsqueda, git status/log/diff, procesos, estado del sistema) corren sin aprobación.'),
              s('write_file, edit_file, move_path, delete_path, http_fetch, forget and run_shell always ask, showing the exact action.', 'write_file, edit_file, move_path, delete_path, http_fetch, forget y run_shell siempre preguntan, mostrando la acción exacta.'),
              s('Without an interactive terminal, approval is denied automatically — nothing runs behind anyone’s back.', 'Sin terminal interactiva, la aprobación se niega sola — nada se ejecuta a espaldas de nadie.'),
              s('Per-device policy: a device can be registered read-only (all mutating tools forbidden) or shell-less.', 'Política por dispositivo: un dispositivo puede registrarse de solo lectura (todas las herramientas que mutan prohibidas) o sin shell.'),
              s('edit_file refuses an ambiguous substitution and leaves the file untouched; delete_path protects root and HOME.', 'edit_file se niega a una sustitución ambigua y deja el archivo intacto; delete_path protege la raíz y el HOME.'),
            ],
          },
        ],
      },
      {
        kind: 'architecture',
        title: s('The failure listener', 'El oyente de fallos'),
        blocks: [
          {
            code: 'failed command → drop the obvious (Ctrl-C, typed command-not-found) → local model filter (strict yes/no)\n  → writer: paid model if >10 min since last call, else local model, else a plain template\n  → desktop notification',
          },
          {
            list: [
              s('Only the last failure of a burst is reported; nothing older than 3 minutes.', 'De una tanda de fallos solo se reporta el último; nada de más de 3 minutos de antigüedad.'),
              s('Without the local model the listener stays silent rather than escalating every typo to a paid API.', 'Sin modelo local el oyente se calla en lugar de escalar cada typo a una API de pago.'),
            ],
          },
        ],
      },
      {
        kind: 'failures',
        blocks: [
          {
            items: [
              {
                title: s('Three typos, three notifications', 'Tres typos, tres notificaciones'),
                body: s('The first run on the real desktop notified on three mistyped commands, two with the model echoing the prompt labels instead of writing. Fixes: typed command-not-found is dropped before the filter; the verdict is read as a strict first-word yes; echoed labels are discarded and a plain template is used instead.', 'La primera corrida en el escritorio real avisó de tres comandos mal escritos, dos con el modelo repitiendo las etiquetas del prompt en lugar de escribir. Correcciones: el command-not-found tecleado se descarta antes del filtro; el veredicto se lee como un sí estricto en la primera palabra; las etiquetas repetidas se tiran y se usa una plantilla simple.'),
              },
              {
                title: s('Unexpanded escape sequences', 'Secuencias de escape sin expandir'),
                body: s('The command-start marker relied on bash translating escapes in PS0; on the target machine it did not, printing junk and silently breaking failure-output capture. The hook now embeds the control bytes, and a test checks the bytes independent of the bash version.', 'El marcador de inicio de comando dependía de que bash tradujera escapes en PS0; en la máquina destino no lo hacía, imprimía basura y rompía en silencio la captura de la salida del fallo. El gancho ahora lleva los bytes de control ya puestos, y una prueba revisa los bytes sin depender de la versión de bash.'),
              },
            ],
          },
        ],
      },
    ],
    sources: [],
  },

  /* ================================================================ *
   * ONE — technical research note
   * ================================================================ */
  {
    slug: 'one',
    depth: 'research',
    abstract: s(
      'A research program testing whether computation from different origins can keep its specific semantics while it matters and then converge onto shared infrastructure — a semantic join after which analysis, optimisation and backends are single and origin-blind.',
      'Un programa de investigación que pone a prueba si el cómputo de orígenes distintos puede conservar su semántica específica mientras importa y luego converger sobre infraestructura compartida — un join semántico tras el cual el análisis, la optimización y los backends son únicos y ciegos al origen.',
    ),
    headline: [
      { value: '0', label: s('implemented components', 'componentes implementados') },
      { value: s('untested', 'sin probar'), label: s('status of every claim in the registry', 'estado de cada claim del registro') },
      { value: '8', label: s('accepted architecture decisions', 'decisiones de arquitectura aceptadas') },
    ],
    caveat: s(
      'There is no implementation and no observed evidence. Nothing here is a result.',
      'No hay implementación ni evidencia observada. Nada de esto es un resultado.',
    ),
    sections: [
      {
        kind: 'architecture',
        title: s('The first experiment: O1', 'El primer experimento: O1'),
        blocks: [
          {
            p: s(
              'O1 tries to break the join on the closest possible pair of origins: a named C subset (ONE-C-O1) and RISC-V RV64IM functions (RV64IM-O1), lowered into Core-O1 and compiled by a single x86-64 backend. Implementation foundation decided but not built: C++17, Core-O1 as an MLIR dialect pinned to llvmorg-23.1.1. Oracles fixed: Sail RISC-V, Spike, Clang, GCC.',
              'O1 intenta romper el join en el par de orígenes más cercano posible: un subconjunto nombrado de C (ONE-C-O1) y funciones RISC-V RV64IM (RV64IM-O1), bajados a Core-O1 y compilados por un único backend x86-64. Fundamento de implementación decidido pero no construido: C++17, Core-O1 como dialecto MLIR fijado a llvmorg-23.1.1. Oráculos fijados: Sail RISC-V, Spike, Clang, GCC.',
            ),
          },
        ],
      },
      {
        kind: 'invariants',
        title: s('Method', 'Método'),
        blocks: [
          {
            items: [
              {
                title: s('Claims registry', 'Registro de claims'),
                body: s('Each claim has an operational statement and a falsifier. States are untested, supported (survived its falsifier — never “proven”), refuted, inconclusive or withdrawn, and every change cites the evidence ledger.', 'Cada claim tiene un enunciado operacional y un falsador. Los estados son untested, supported (sobrevivió a su falsador — nunca «probado»), refuted, inconclusive o withdrawn, y cada cambio cita el ledger de evidencia.'),
              },
              {
                title: s('Origin erasure', 'Borrado de origen'),
                body: s('Post-join output must be identical after erasing provenance; any origin-keyed branch in post-join code refutes the join claim.', 'La salida después del join tiene que ser idéntica tras borrar la procedencia; cualquier rama que dependa del origen en código posterior al join refuta el claim del join.'),
              },
              {
                title: s('Preregistered gates', 'Gates preregistrados'),
                body: s('Thresholds, corpus partitions (held-out sealed before shared passes), positive and negative controls, and a preregistration commit come before the campaign runs.', 'Umbrales, particiones del corpus (held-out sellado antes de los pases compartidos), controles positivos y negativos, y un commit de preregistro van antes de correr la campaña.'),
              },
            ],
          },
        ],
      },
      {
        kind: 'nonClaims',
        blocks: [
          {
            list: [
              s('The global thesis is not proven, and O1 cannot prove it: C and RV64 are the closest, imperative, scalar pair.', 'La tesis global no está probada, y O1 no puede probarla: C y RV64 son el par más cercano, imperativo y escalar.'),
              s('No novelty is claimed for shared IRs, SSA, multi-level IR, lifting or translation validation.', 'No se afirma novedad de IRs compartidos, SSA, IR multinivel, lifting ni translation validation.'),
              s('The claim of a new architectural advantage (H6) has no concrete candidate registered — the registry calls it the weakest claim.', 'El claim de una ventaja arquitectónica nueva (H6) no tiene candidato concreto registrado — el propio registro lo llama el claim más débil.'),
              s('Differential testing and fuzzing are not formal verification; no performance superiority over Clang, GCC, QEMU or LLVM is claimed.', 'Las pruebas diferenciales y el fuzzing no son verificación formal; no se afirma superioridad de rendimiento sobre Clang, GCC, QEMU ni LLVM.'),
            ],
          },
        ],
      },
    ],
    sources: [
      { label: s('Repository', 'Repositorio'), href: `${GH}/one` },
      { label: s('Claims registry', 'Registro de claims'), href: `${GH}/one/blob/main/vault/claims.md` },
      { label: s('Current state', 'Estado actual'), href: `${GH}/one/blob/main/vault/roadmap/current-state.md` },
    ],
  },

  /* ================================================================ *
   * ACREDITA-BACH — short technical note
   * ================================================================ */
  {
    slug: 'acredita-bach',
    depth: 'note',
    abstract: s(
      'A browser-only study engine (SM-2 spaced repetition adapted to three buttons, interleaved new topics, per-area weighting) whose central invariant — nothing is asked before it is taught — is enforced by automated checks.',
      'Un motor de estudio solo en el navegador (repetición espaciada SM-2 adaptada a tres botones, temas nuevos entrelazados, ponderación por área) cuya invariante central — nada se pregunta antes de enseñarse — la hacen cumplir comprobaciones automáticas.',
    ),
    headline: [
      { value: '177', label: s('topics across 7 areas', 'temas en 7 áreas') },
      { value: '1,032', label: s('cards', 'tarjetas') },
      { value: '1,708', label: s('written questions', 'reactivos escritos') },
      { value: '45', label: s('topics with generated problem sets', 'temas con problemas generados') },
    ],
    caveat: s(
      'Independent tool: it makes no claim of exam results and has no affiliation with Ceneval.',
      'Herramienta independiente: no afirma resultados en el examen y no tiene afiliación con el Ceneval.',
    ),
    sections: [
      {
        kind: 'invariants',
        blocks: [
          {
            list: [
              s('npm run test:motor fails if a closed block releases a question, if a card appears before its block’s lesson, or if learning and review mix.', 'npm run test:motor falla si un bloque cerrado suelta una pregunta, si una tarjeta aparece antes que la lección de su bloque o si aprender y repasar se mezclan.'),
              s('npm run validate fails if a card defines a concept that neither the topic note nor its lesson explains, naming the concept.', 'npm run validate falla si una tarjeta define un concepto que ni la nota del tema ni su lección explican, nombrando el concepto.'),
              s('Questions have exactly three options, as the official guide specifies; the validator enforces it.', 'Los reactivos tienen exactamente tres opciones, como indica la guía oficial; el validador lo exige.'),
            ],
          },
          {
            p: s(
              'Simulations use the exam’s physical count (106 + 99 questions, 4 h 30 min and 4 h) and discount the unscored pilot block when grading. Progress is local-first; an optional account merges rather than overwrites.',
              'Los simulacros usan la cuenta física del examen (106 + 99 reactivos, 4 h 30 min y 4 h) y descuentan el bloque piloto al calificar. El avance es local primero; una cuenta opcional mezcla en lugar de sobrescribir.',
            ),
          },
        ],
      },
      { kind: 'reproduce', blocks: [{ code: 'npm install\nnpm run check    # validate + generators + engine + build' }] },
    ],
    sources: [{ label: s('Repository', 'Repositorio'), href: `${GH}/study-acreditabach` }],
  },

  /* ================================================================ *
   * cesarmanzocode-rice — short technical note
   * ================================================================ */
  {
    slug: 'cesarmanzocode-rice',
    depth: 'note',
    abstract: s(
      'A modular Hyprland environment with a deterministic Bash installer, separating shared behaviour (config/), theme (themes/<name>/) and personal preferences kept outside the repository.',
      'Un entorno Hyprland modular con un instalador determinista en Bash, que separa el comportamiento compartido (config/), el tema (themes/<nombre>/) y las preferencias personales, guardadas fuera del repositorio.',
    ),
    headline: [],
    caveat: s('Arch Linux only for automatic package installation.', 'Solo Arch Linux para la instalación automática de paquetes.'),
    sections: [
      {
        kind: 'architecture',
        blocks: [
          {
            list: [
              s('Switching themes never changes apps or keybinds; pulling new commits never overwrites preferences.', 'Cambiar de tema nunca cambia apps ni atajos; bajar commits nuevos nunca sobrescribe preferencias.'),
              s('--dry-run prints what would happen and changes nothing; existing configs are backed up first.', '--dry-run imprime lo que pasaría y no cambia nada; las configuraciones existentes se respaldan primero.'),
              s('Components are independent: declining one leaves it untouched. Autostart goes through systemd user units where a component ships one.', 'Los componentes son independientes: rechazar uno lo deja intacto. El autoarranque va por unidades de usuario de systemd cuando el componente trae una.'),
              s('No Python, Node, Ansible, Nix or Stow at runtime — Bash, and Hyprland’s own embedded Lua.', 'Sin Python, Node, Ansible, Nix ni Stow en tiempo de ejecución — Bash y el Lua embebido del propio Hyprland.'),
            ],
          },
        ],
      },
      { kind: 'reproduce', blocks: [{ code: './install.sh --dry-run\n./install.sh --defaults\ntests/run_tests.sh' }] },
    ],
    sources: [{ label: s('Repository', 'Repositorio'), href: `${GH}/cesarmanzocode-rice` }],
  },
];

export function getTech(slug: string): TechDoc | undefined {
  return TECH.find((t) => t.slug === slug);
}
