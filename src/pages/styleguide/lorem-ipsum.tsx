import React from 'react';

import Layout from '../../components/Layout';
import SEO from '../../components/seo';

const TypographyPage = () => {
  return (
    <Layout>
      <SEO title="Manonet - Styleguide - Colors" />
      <h1>HTML Ipsum</h1>

      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
        egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend
        leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum
        erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean
        fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci,
        sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar
        facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor
        neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat
        volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
        luctus, metus
      </p>

      <ul>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
        <li>Vestibulum auctor dapibus neque.</li>
      </ul>

      <h1>HTML Ipsum Presents</h1>

      <p>
        <strong>Pellentesque habitant morbi tristique</strong> senectus et netus
        et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
        vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet
        quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris
        placerat eleifend leo. Quisque sit amet est et sapien ullamcorper
        pharetra. Vestibulum erat wisi, condimentum sed,{' '}
        <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum,
        elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus
        lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar
        facilisis. Ut felis.
      </p>

      <h2>Header Level 2</h2>

      <ol>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
      </ol>

      <blockquote>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
          molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis
          mollis, tellus est malesuada tellus, at luctus turpis elit sit amet
          quam. Vivamus pretium ornare est.
        </p>
      </blockquote>

      <h3>Header Level 3</h3>

      <ul>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
      </ul>

      <pre>
        <code>
          #header h1 a {'{'}
          display: block; width: 300px; height: 80px;
          {'}'}
        </code>
      </pre>

      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
        egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend
        leo.
      </p>

      <ul>
        <li>
          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod
          in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.
        </li>
        <li>
          Praesent dapibus, neque id cursus faucibus, tortor neque egestas
          augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui
          mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
        </li>
        <li>
          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
          consectetuer ligula vulputate sem tristique cursus. Nam nulla quam,
          gravida non, commodo a, sodales sit amet, nisi.
        </li>
        <li>
          Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor,
          ultrices ut, elementum vulputate, nunc.
        </li>
      </ul>

      <form action="#" method="post">
        <div>
          <label htmlFor="name">Text Input:</label>
          <input type="text" name="name" id="name" tabIndex={1} />
        </div>

        <div>
          <h4>Radio Button Choice</h4>

          <label htmlFor="radio-choice-1">Choice 1</label>
          <input
            type="radio"
            name="radio-choice-1"
            id="radio-choice-1"
            tabIndex={2}
            defaultValue="choice-1"
          />

          <label htmlFor="radio-choice-2">Choice 2</label>
          <input
            type="radio"
            name="radio-choice-2"
            id="radio-choice-2"
            tabIndex={3}
            defaultValue="choice-2"
          />
        </div>

        <div>
          <label htmlFor="select-choice">Select Dropdown Choice:</label>
          <select name="select-choice" id="select-choice">
            <option value="Choice 1">Choice 1</option>
            <option value="Choice 2">Choice 2</option>
            <option value="Choice 3">Choice 3</option>
          </select>
        </div>

        <div>
          <label htmlFor="textarea">Textarea:</label>
          <textarea cols={40} rows={8} name="textarea" id="textarea"></textarea>
        </div>

        <div>
          <label htmlFor="checkbox">Checkbox:</label>
          <input type="checkbox" name="checkbox" id="checkbox" />
        </div>

        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>

      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas.
      </p>

      <ol>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
        <li>Vestibulum auctor dapibus neque.</li>
      </ol>

      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <dl>
        <dt>Definition list</dt>
        <dd>
          Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </dd>
        <dt>Lorem ipsum dolor sit amet</dt>
        <dd>
          Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </dd>
      </dl>

      <nav>
        <ul>
          <li>
            <a href="#nowhere" title="Lorum ipsum dolor sit amet">
              Lorem
            </a>
          </li>
          <li>
            <a href="#nowhere" title="Aliquam tincidunt mauris eu risus">
              Aliquam
            </a>
          </li>
          <li>
            <a href="#nowhere" title="Morbi in sem quis dui placerat ornare">
              Morbi
            </a>
          </li>
          <li>
            <a
              href="#nowhere"
              title="Praesent dapibus, neque id cursus faucibus"
            >
              Praesent
            </a>
          </li>
          <li>
            <a href="#nowhere" title="Pellentesque fermentum dolor">
              Pellentesque
            </a>
          </li>
        </ul>
      </nav>

      <h1>Lorem ipsum dolor sit amet consectetuer adipiscing elit</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa
        <strong>strong</strong>. Cum sociis natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
        nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
        enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
        Nullam dictum felis eu pede{' '}
        <a className="external ext" href="#">
          link
        </a>
        mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
        semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
        porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante,
        dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
        metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies
        nisi vel augue. Curabitur ullamcorper ultricies nisi.
      </p>

      <h1>Lorem ipsum dolor sit amet consectetuer adipiscing elit</h1>

      <h2>Aenean commodo ligula eget dolor aenean massa</h2>

      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem.
      </p>

      <h2>Aenean commodo ligula eget dolor aenean massa</h2>

      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem.
      </p>

      <ul>
        <li>Lorem ipsum dolor sit amet consectetuer.</li>
        <li>Aenean commodo ligula eget dolor.</li>
        <li>Aenean massa cum sociis natoque penatibus.</li>
      </ul>

      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem.
      </p>

      <form action="#" method="post">
        <fieldset>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your 
	full name"
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter 
	your email address"
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            placeholder="What's on your 
	mind?"
          ></textarea>

          <input type="submit" value="Send message" />
        </fieldset>
      </form>

      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem.
      </p>

      <table className="data">
        <tbody>
          <tr>
            <th>Entry Header 1</th>
            <th>Entry Header 2</th>
            <th>Entry Header 3</th>
            <th>Entry Header 4</th>
          </tr>
          <tr>
            <td>Entry First Line 1</td>
            <td>Entry First Line 2</td>
            <td>Entry First Line 3</td>
            <td>Entry First Line 4</td>
          </tr>
          <tr>
            <td>Entry Line 1</td>
            <td>Entry Line 2</td>
            <td>Entry Line 3</td>
            <td>Entry Line 4</td>
          </tr>
          <tr>
            <td>Entry Last Line 1</td>
            <td>Entry Last Line 2</td>
            <td>Entry Last Line 3</td>
            <td>Entry Last Line 4</td>
          </tr>
        </tbody>
      </table>

      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem.
      </p>

      <h1>Et nemo nimium beatus est;</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod non
        faceret, si in voluptate summum bonum poneret. Quae quidem sapientes
        sequuntur duce natura tamquam videntes; At ille non pertimuit saneque
        fidenter: Istis quidem ipsis verbis, inquit; Qua tu etiam inprudens
        utebare non numquam. Duo Reges: constructio interrete. De vacuitate
        doloris eadem sententia erit. At miser, si in flagitiosa et vitiosa vita
        afflueret voluptatibus. Nulla profecto est, quin suam vim retineat a
        primo ad extremum.{' '}
      </p>

      <p>
        Certe, nisi voluptatem tanti aestimaretis.{' '}
        <a href="http://loripsum.net/" target="_blank">
          Murenam te accusante defenderem.
        </a>{' '}
        Quamquam te quidem video minime esse deterritum. Quae quo sunt
        excelsiores, eo dant clariora indicia naturae. Nunc reliqua videamus,
        nisi aut ad haec, Cato, dicere aliquid vis aut nos iam longiores sumus.
        Si longus, levis dictata sunt.{' '}
      </p>

      <p>
        Multa sunt dicta ab antiquis de contemnendis ac despiciendis rebus
        humanis; Ita multa dicunt, quae vix intellegam. Quam nemo umquam
        voluptatem appellavit, appellat; Cur igitur, cum de re conveniat, non
        malumus usitate loqui?{' '}
      </p>

      <ul>
        <li>An nisi populari fama?</li>
        <li>Primum in nostrane potestate est, quid meminerimus?</li>
      </ul>

      <p>
        <a href="http://loripsum.net/" target="_blank">
          Idemne, quod iucunde?
        </a>{' '}
        Videmusne ut pueri ne verberibus quidem a contemplandis rebus
        perquirendisque deterreantur? Cur ipse Pythagoras et Aegyptum lustravit
        et Persarum magos adiit? Te enim iudicem aequum puto, modo quae dicat
        ille bene noris. Res enim se praeclare habebat, et quidem in utraque
        parte. An potest, inquit ille, quicquam esse suavius quam nihil dolere?{' '}
      </p>

      <blockquote cite="http://loripsum.net">
        Quodsi esset in voluptate summum bonum, ut dicitis, optabile esset
        maxima in voluptate nullo intervallo interiecto dies noctesque versari,
        cum omnes sensus dulcedine omni quasi perfusi moverentur.
      </blockquote>

      <h3>
        Quis suae urbis conservatorem Codrum, quis Erechthei filias non maxime
        laudat?
      </h3>

      <p>
        <b>At enim hic etiam dolore.</b> Polemoni et iam ante Aristoteli ea
        prima visa sunt, quae paulo ante dixi. Quid enim de amicitia statueris
        utilitatis causa expetenda vides. Quantum Aristoxeni ingenium consumptum
        videmus in musicis? Atque haec coniunctio confusioque virtutum tamen a
        philosophis ratione quadam distinguitur. Sic enim censent, oportunitatis
        esse beate vivere.{' '}
      </p>

      <ol>
        <li>Verba tu fingas et ea dicas, quae non sentias?</li>
        <li>Sic enim censent, oportunitatis esse beate vivere.</li>
        <li>
          Est tamen ea secundum naturam multoque nos ad se expetendam magis
          hortatur quam superiora omnia.
        </li>
        <li>Sed haec in pueris;</li>
        <li>
          Atque hoc loco similitudines eas, quibus illi uti solent,
          dissimillimas proferebas.
        </li>
      </ol>

      <h2>
        An eum locum libenter invisit, ubi Demosthenes et Aeschines inter se
        decertare soliti sunt?
      </h2>

      <p>
        Atque haec coniunctio confusioque virtutum tamen a philosophis ratione
        quadam distinguitur. <mark>Si longus, levis dictata sunt.</mark>{' '}
        <a href="http://loripsum.net/" target="_blank">
          Verum hoc idem saepe faciamus.
        </a>{' '}
        <a href="http://loripsum.net/" target="_blank">
          Summum a vobis bonum voluptas dicitur.
        </a>{' '}
        Sin tantum modo ad indicia veteris memoriae cognoscenda, curiosorum.{' '}
        <mark>Odium autem et invidiam facile vitabis.</mark> At quicum ioca
        seria, ut dicitur, quicum arcana, quicum occulta omnia? At enim, qua in
        vita est aliquid mali, ea beata esse non potest.{' '}
      </p>

      <dl>
        <dt>
          <dfn>Falli igitur possumus.</dfn>
        </dt>
        <dd>Suam denique cuique naturam esse ad vivendum ducem.</dd>
        <dt>
          <dfn>Easdemne res?</dfn>
        </dt>
        <dd>
          Qui enim voluptatem ipsam contemnunt, iis licet dicere se acupenserem
          maenae non anteponere.
        </dd>
        <dt>
          <dfn>Quid vero?</dfn>
        </dt>
        <dd>Nescio quo modo praetervolavit oratio.</dd>
        <dt>
          <dfn>Quid adiuvas?</dfn>
        </dt>
        <dd>
          Et hunc idem dico, inquieta sed ad virtutes et ad vitia nihil
          interesse.
        </dd>
      </dl>

      <pre>{`
        P R E F O R M A T T E D T E X T ! " # $ % &amp; ' ( ) * + , - . / 0 1 2
        3 4 5 6 7 8 9 : ; &lt; = &gt; ? @ A B C D E F G H I J K L M N O P Q R S
        T U V W X Y Z [ \ ] ^ _   a b c d e f g h i j k l m n o p q r s t u v w
        x y z { | } ~
      `}</pre>

      <ol>
        <li>Non igitur bene.</li>
        <li>Peccata paria.</li>
        <li>Videmus igitur ut conquiescere ne infantes quidem possint.</li>
        <li>
          Sed quid minus probandum quam esse aliquem beatum nec satis beatum?
        </li>
        <li>Gloriosa ostentatio in constituendo summo bono.</li>
      </ol>

      <dl>
        <dt>
          <dfn>At certe gravius.</dfn>
        </dt>
        <dd>
          Quasi vero, inquit, perpetua oratio rhetorum solum, non etiam
          philosophorum sit.
        </dd>
        <dt>
          <dfn>Sint ista Graecorum;</dfn>
        </dt>
        <dd>At multis malis affectus.</dd>
        <dt>
          <dfn>Avaritiamne minuis?</dfn>
        </dt>
        <dd>Ipse Epicurus fortasse redderet, ut Sextus Peducaeus, Sex.</dd>
        <dt>
          <dfn>Erat enim Polemonis.</dfn>
        </dt>
        <dd>Isto modo ne improbos quidem, si essent boni viri.</dd>
      </dl>

      <blockquote cite="http://loripsum.net">
        Hoc est dicere: Non reprehenderem asotos, si non essent asoti.
      </blockquote>

      <p>
        Praeteritis, inquit, gaudeo. Sin te auctoritas commovebat, nobisne
        omnibus et Platoni ipsi nescio quem illum anteponebas? An hoc usque
        quaque, aliter in vita? Quem si tenueris, non modo meum Ciceronem, sed
        etiam me ipsum abducas licebit. Quid ei reliquisti, nisi te, quoquo modo
        loqueretur, intellegere, quid diceret?{' '}
        <code>Nunc de hominis summo bono quaeritur;</code>{' '}
        <a href="http://loripsum.net/" target="_blank">
          Nos vero, inquit ille;
        </a>{' '}
        At certe gravius.{' '}
      </p>

      <p>
        Bestiarum vero nullum iudicium puto. In eo enim positum est id, quod
        dicimus esse expetendum. Quae contraria sunt his, malane? Post enim
        Chrysippum eum non sane est disputatum. Qua tu etiam inprudens utebare
        non numquam. Ad eos igitur converte te, quaeso. Tibi hoc incredibile,
        quod beatissimum. Qui-vere falsone, quaerere mittimus-dicitur oculis se
        privasse; Quod autem principium officii quaerunt, melius quam Pyrrho;
        Quid enim possumus hoc agere divinius?{' '}
      </p>

      <p>
        <i>Laboro autem non sine causa;</i> Cur post Tarentum ad Archytam? Quod
        vestri non item. Comprehensum, quod cognitum non habet? Beatus autem
        esse in maximarum rerum timore nemo potest. Quis istum dolorem timet?
        Quis enim redargueret?{' '}
      </p>

      <p>
        Ergo illi intellegunt quid Epicurus dicat, ego non intellego? Illis
        videtur, qui illud non dubitant bonum dicere -; Bona autem corporis huic
        sunt, quod posterius posui, similiora.{' '}
        <a href="http://loripsum.net/" target="_blank">
          Quae contraria sunt his, malane?
        </a>{' '}
        Multa sunt dicta ab antiquis de contemnendis ac despiciendis rebus
        humanis; <mark>Idemne, quod iucunde?</mark> Laboro autem non sine causa;
        Sapientem locupletat ipsa natura, cuius divitias Epicurus parabiles esse
        docuit.{' '}
      </p>

      <ul>
        <li>Utilitatis causa amicitia est quaesita.</li>
        <li>
          Hoc est vim afferre, Torquate, sensibus, extorquere ex animis
          cognitiones verborum, quibus inbuti sumus.
        </li>
      </ul>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec{' '}
        <b>Lorem</b> odio. Praesent libero. Sed cursus ante dapibus diam. Sed{' '}
        <i>Lorem</i> nisi. <b>odio.</b> Nulla quis sem at nibh elementum{' '}
        <i>Lorem</i> imperdiet. Duis sagittis ipsum. Praesent mauris.{' '}
        <b>nibh</b> Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu <i>sem</i> eget <i>Praesent</i> nulla. Class
        aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Curabitur <i>nulla.</i> sodales ligula in libero.
        Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean
        quam. In scelerisque <i>inceptos</i> sem at dolor. Maecenas mattis. Sed
        convallis tristique sem. Proin ut ligula <i>lacinia</i> vel nunc{' '}
        <b>mattis.</b> egestas porttitor. Morbi lectus risus, iaculis{' '}
        <i>Aenean</i> vel, suscipit quis, luctus <i>mattis.</i> non, massa.
        Fusce ac <b>vel,</b> turpis quis ligula lacinia <b>luctus</b> aliquet.
        Mauris <b>non,</b> ipsum. Nulla metus metus, ullamcorper vel, tincidunt
        sed, euismod <b>metus</b> in, nibh. <b>ipsum.</b> Quisque volutpat
        condimentum velit. Class aptent taciti sociosqu ad <i>turpis</i> litora
        torquent per <i>ullamcorper</i> conubia nostra, per inceptos himenaeos.{' '}
        <i>vel,</i> Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor
        neque adipiscing diam, a <b>non</b> cursus <i>inceptos</i> ipsum{' '}
        <i>ante.</i> ante quis turpis. Nulla facilisi. Ut <b>cursus</b>{' '}
        fringilla. Suspendisse potenti. Nunc feugiat mi a tellus{' '}
        <b>Suspendisse</b> consequat imperdiet. Vestibulum sapien. Proin quam.
        Etiam ultrices. Suspendisse in justo eu <b>Vestibulum</b> magna luctus{' '}
        <i>imperdiet.</i> suscipit. Sed lectus. Integer euismod lacus luctus
        magna. Quisque cursus, <b>lectus.</b> metus vitae pharetra{' '}
        <b>suscipit.</b> auctor, sem massa <b>magna.</b> mattis sem, at interdum
        magna augue eget diam. Vestibulum <b>mattis</b> ante ipsum primis{' '}
        <i>sem</i> in faucibus orci luctus et ultrices <b>ipsum</b> posuere
        cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed
        non quam. In vel mi sit amet <b>dolor.</b> augue congue elementum. Morbi
        in ipsum sit amet pede facilisis laoreet. Donec lacus <b>augue</b> nunc,
        viverra nec.
      </p>
    </Layout>
  );
};

export default TypographyPage;
