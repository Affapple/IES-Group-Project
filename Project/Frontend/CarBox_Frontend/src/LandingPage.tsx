import React from 'react';


const LandingPage: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#F8F9FA' }}>
      <div style={{ width: 361, height: 277.93, left: 105, top: 316.07, position: 'absolute' }}>
        <div style={{ width: 361, height: 277.93, position: 'absolute', display: 'inline-flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 37.45 }}>
          <div style={{ width: 324.92 }}>
            <span style={{ color: '#2C2C2C', fontSize: 44.95, fontFamily: 'Poppins', fontWeight: 600, lineHeight: '44.95px', wordWrap: 'break-word' }}>
              The best way to keep up with
            </span>
            <span style={{ color: '#30D354', fontSize: 44.95, fontFamily: 'Poppins', fontWeight: 700, lineHeight: '44.95px', wordWrap: 'break-word' }}>
              your car
            </span>
          </div>
          <div style={{ width: 355, color: '#6C757D', fontSize: 16.85, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '25.28px', wordWrap: 'break-word' }}>
            A streamlined hub for everything about my car—specs, maintenance, fuel efficiency, and custom upgrades—all in one place. Easy to access, simple to navigate.
          </div>
        </div>
        <div style={{ width: 178.21, height: 34.25, left: 138.86, top: 110.93, position: 'absolute', transform: 'rotate(7.01deg)', transformOrigin: '0 0', background: '#30D354' }}></div>
      </div>

      <div style={{ left: 1133.52, top: 80, position: 'absolute', display: 'inline-flex', justifyContent: 'flex-start', alignItems: 'center', gap: 27.91 }}>
        <div style={{ color: '#2C2C2C', fontSize: 18.61, fontFamily: 'Poppins', fontWeight: 500, lineHeight: '27.91px', wordWrap: 'break-word' }}>Sign in</div>
        <div style={{ paddingLeft: 37.21, paddingRight: 37.21, paddingTop: 18.61, paddingBottom: 18.61, background: '#30D354', borderRadius: 9.3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 9.3 }}>
          <div style={{ color: '#F8F9FA', fontSize: 18.61, fontFamily: 'Poppins', fontWeight: 500, lineHeight: '27.91px', wordWrap: 'break-word' }}>Sign up</div>
        </div>
      </div>

      <div style={{ left: 105, top: 80, position: 'absolute' }}>
        <div style={{ width: 41.84, height: 41.84, position: 'absolute', background: '#30D354' }}></div>
        <div style={{ left: 62.76, top: 0, position: 'absolute', color: '#2C2C2C', fontSize: 34.87, fontFamily: 'Poppins', fontWeight: 600, wordWrap: 'break-word' }}>CarBox</div>
      </div>

      <div style={{ width: 334.28, height: 14.98, left: 513.26, top: 706.54, position: 'absolute', textAlign: 'center', color: '#6C757D', fontSize: 16.85, fontFamily: 'DM Sans', fontWeight: 400, lineHeight: '25.28px', wordWrap: 'break-word' }}>Check your:</div>
      
      <img style={{ width: 1067.46, height: 485.98, left: 332.54, top: 170, position: 'absolute' }} src="https://via.placeholder.com/1067x486" alt="CarBox placeholder" />
      
      <div style={{ left: 239.84, top: 743.99, position: 'absolute', display: 'inline-flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 44.95 }}>
        {['BATTERY', 'LAST LOCATION', 'AUTONOMY', 'FUEL AVERAGES', 'LAST TRIPS'].map((text) => (
          <div key={text} style={{ width: 140.46, height: 140.46, position: 'relative' }}>
            <div style={{ width: text.length * 10, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#30D354', fontSize: 13.11, fontFamily: 'Poppins', fontWeight: 700, textTransform: 'uppercase', lineHeight: '13.11px', letterSpacing: '1.31px', wordWrap: 'break-word' }}>{text}</div>
            <div style={{ width: 140.46, height: 140.46, position: 'absolute', borderRadius: '50%', border: '2.81px solid #30D354' }} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default LandingPage;