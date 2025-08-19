import ProfileButton from '@/components/ProfileButton'

export default function CenterMenu({ onMusic }: { onMusic?: () => void }) {
  return (
    <div className="center-menu p-3">
      <div className="menu">
        <a href="#" className="link">
          <span className="link-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none"></rect>
              <path d="M213.3815,109.61945,133.376,36.88436a8,8,0,0,0-10.76339.00036l-79.9945,72.73477A8,8,0,0,0,40,115.53855V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V115.53887A8,8,0,0,0,213.3815,109.61945Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
            </svg>
          </span>
          <span className="link-title">Home</span>
        </a>
        <a href="#" className="link" onClick={(e)=>{ e.preventDefault(); onMusic && onMusic(); }}>
          <span className="link-icon">
            {/* YouTube icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 256 256" fill="currentColor">
              <rect width="256" height="256" fill="none"></rect>
              <path d="M230.3,84.2a32,32,0,0,0-22.5-22.6C191.7,56,128,56,128,56s-63.7,0-79.8,5.6A32,32,0,0,0,25.7,84.2C20,100.3,20,128,20,128s0,27.7,5.7,43.8a32,32,0,0,0,22.5,22.6C64.3,200,128,200,128,200s63.7,0,79.8-5.6a32,32,0,0,0,22.5-22.6C236,155.7,236,128,236,128S236,100.3,230.3,84.2Z"></path>
              <polygon points="112 160 160 128 112 96 112 160" fill="#000"></polygon>
            </svg>
          </span>
          <span className="link-title">YouTube</span>
        </a>
        <a href="https://open.spotify.com" target="_blank" rel="noreferrer" className="link">
          <span className="link-icon">
            {/* Spotify icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 256 256" fill="currentColor">
              <rect width="256" height="256" fill="none"></rect>
              <circle cx="128" cy="128" r="84" stroke="currentColor" strokeWidth="16" fill="none"></circle>
              <path d="M76 112c40-10 64-6 96 6" stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="round"/>
              <path d="M80 136c36-8 58-6 88 6" stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round"/>
              <path d="M84 156c28-6 48-4 72 6" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="link-title">Spotify</span>
        </a>
        <ProfileButton
          renderTrigger={(open) => (
            <a href="#" className="link" onClick={(e)=>{ e.preventDefault(); open(); }}>
              <span className="link-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
                  <rect width="256" height="256" fill="none"></rect>
                  <circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="16"></circle>
                  <path d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                </svg>
              </span>
              <span className="link-title">Profile</span>
            </a>
          )}
        />
      </div>
    </div>
  )
}


