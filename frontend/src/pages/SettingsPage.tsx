import { useState } from 'react';
import { Settings, User, Bell, Shield, Database, Palette, Check } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cx } from '@/lib/cx';

const sections = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'data', label: 'Data & Integrations', icon: Database },
  { key: 'appearance', label: 'Appearance', icon: Palette },
] as const;

type SectionKey = (typeof sections)[number]['key'];

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cx(
        'relative h-6 w-11 rounded-full transition-colors',
        on ? 'bg-brand-600' : 'bg-ink-200'
      )}
    >
      <span
        className={cx(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
          on ? 'translate-x-5' : 'translate-x-0.5'
        )}
      />
    </button>
  );
}

export function SettingsPage() {
  const [section, setSection] = useState<SectionKey>('profile');
  const [notif, setNotif] = useState({ lowStock: true, newOrders: true, aiAlerts: true, weekly: false });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Settings"
        description="Configure your workspace, notifications, and integrations"
        icon={<Settings className="h-5 w-5" />}
      />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <Card className="h-fit p-3">
          <nav className="flex flex-col gap-0.5">
            {sections.map((s) => {
              const Icon = s.icon;
              const active = section === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setSection(s.key)}
                  className={cx('nav-item', active && 'nav-item-active')}
                >
                  <Icon className="h-4 w-4" />
                  {s.label}
                </button>
              );
            })}
          </nav>
        </Card>

        <div className="space-y-6">
          {section === 'profile' && (
            <Card>
              <CardHeader title="Profile" subtitle="Your account information" icon={<User className="h-4 w-4" />} />
              <div className="space-y-4 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl font-700 text-white">ER</div>
                  <div>
                    <Button variant="secondary" size="sm">Change Avatar</Button>
                    <p className="mt-1 text-xs text-ink-400">JPG or PNG, max 2MB</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-600 text-ink-600">Full Name</label>
                    <input className="input" defaultValue="Elena Rivera" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-600 text-ink-600">Role</label>
                    <input className="input" defaultValue="Operations Lead" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-600 text-ink-600">Email</label>
                    <input className="input" defaultValue="elena.rivera@stockpilot.io" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-600 text-ink-600">Phone</label>
                    <input className="input" defaultValue="+1 (201) 555-0144" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} icon={saved ? <Check className="h-4 w-4" /> : undefined}>
                    {saved ? 'Saved' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {section === 'notifications' && (
            <Card>
              <CardHeader title="Notifications" subtitle="Choose what alerts you receive" icon={<Bell className="h-4 w-4" />} />
              <div className="divide-y divide-ink-100">
                {[
                  { key: 'lowStock' as const, title: 'Low stock alerts', desc: 'Notify when products drop below reorder level' },
                  { key: 'newOrders' as const, title: 'New orders', desc: 'Alert on incoming sales orders' },
                  { key: 'aiAlerts' as const, title: 'AI recommendations', desc: 'Get notified of new AI-generated insights' },
                  { key: 'weekly' as const, title: 'Weekly digest', desc: 'Summary report every Monday morning' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-5">
                    <div>
                      <p className="text-sm font-600 text-ink-800">{item.title}</p>
                      <p className="text-xs text-ink-400 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle on={notif[item.key]} onChange={() => setNotif((n) => ({ ...n, [item.key]: !n[item.key] }))} />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {section === 'security' && (
            <Card>
              <CardHeader title="Security" subtitle="Protect your account" icon={<Shield className="h-4 w-4" />} />
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between rounded-xl bg-accent-50 p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-accent-600" />
                    <div>
                      <p className="text-sm font-600 text-ink-800">Two-factor authentication</p>
                      <p className="text-xs text-ink-400">Enabled · last verified 2 days ago</p>
                    </div>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-600 text-ink-600">Current Password</label>
                  <input type="password" className="input" defaultValue="password" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-600 text-ink-600">New Password</label>
                    <input type="password" className="input" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-600 text-ink-600">Confirm Password</label>
                    <input type="password" className="input" placeholder="••••••••" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} icon={saved ? <Check className="h-4 w-4" /> : undefined}>{saved ? 'Saved' : 'Update Password'}</Button>
                </div>
              </div>
            </Card>
          )}

          {section === 'data' && (
            <Card>
              <CardHeader title="Data & Integrations" subtitle="Connected services and data exports" icon={<Database className="h-4 w-4" />} />
              <div className="divide-y divide-ink-100">
                {[
                  { name: 'Shopify', desc: 'Sync orders and product catalog', status: 'connected' },
                  { name: 'QuickBooks', desc: 'Accounting and financial reporting', status: 'connected' },
                  { name: 'ShipStation', desc: 'Shipping and fulfillment automation', status: 'disconnected' },
                  { name: 'Slack', desc: 'Team notifications and alerts', status: 'connected' },
                ].map((int) => (
                  <div key={int.name} className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-50 font-700 text-ink-600 text-sm">
                        {int.name.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-600 text-ink-800">{int.name}</p>
                        <p className="text-xs text-ink-400">{int.desc}</p>
                      </div>
                    </div>
                    {int.status === 'connected' ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="success">Connected</Badge>
                        <Button variant="ghost" size="sm">Configure</Button>
                      </div>
                    ) : (
                      <Button variant="secondary" size="sm">Connect</Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {section === 'appearance' && (
            <Card>
              <CardHeader title="Appearance" subtitle="Customize the look and feel" icon={<Palette className="h-4 w-4" />} />
              <div className="space-y-5 p-5">
                <div>
                  <p className="mb-2 text-sm font-600 text-ink-700">Theme</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {['Light', 'Dark', 'System'].map((theme, i) => (
                      <button
                        key={theme}
                        className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${i === 0 ? 'border-brand-400 bg-brand-50' : 'border-ink-200 hover:border-ink-300'}`}
                      >
                        <div className={`h-12 w-full rounded-lg ${i === 0 ? 'bg-white' : i === 1 ? 'bg-ink-800' : 'bg-gradient-to-r from-white to-ink-800'}`} />
                        <span className="text-sm font-600 text-ink-700">{theme}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-600 text-ink-700">Accent Color</p>
                  <div className="flex gap-2">
                    {['#1385fb', '#0ba364', '#8b5cf6', '#e88410', '#e03636'].map((color, i) => (
                      <button
                        key={color}
                        className={`h-9 w-9 rounded-lg transition-all ${i === 0 ? 'ring-2 ring-offset-2 ring-brand-400' : 'hover:scale-110'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} icon={saved ? <Check className="h-4 w-4" /> : undefined}>{saved ? 'Saved' : 'Save Preferences'}</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
